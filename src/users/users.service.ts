import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectQueue as InjectBullMQQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { QUEUE_NAME as BULLMQ_QUEUE_NAME } from '../bullmq/bullmq.constants';

@Injectable()
export class UsersService {
  constructor(
    @InjectBullMQQueue(BULLMQ_QUEUE_NAME) private bullMQQueue: Queue,
  ) {}
  private users = [];

  async createUser(userData: CreateUserDto): Promise<CreateUserDto> {
    const newUser = { id: Date.now(), ...userData };
    this.users.push(newUser);
    await this.bullMQQueue.add(
      'send-welcome-email',
      {
        email: newUser.email,
        name: newUser.name,
      },
      {
        delay: 2000,
        attempts: 1,
      },
    );
    return newUser;
  }

  async getUserById(userId: number): Promise<any> {
    return this.users.find((user) => user.id === userId);
  }
}
