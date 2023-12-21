import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly mailerService: MailerService,
    @InjectQueue('email-queue') private emailQueue: Queue,
  ) {}
  private users = [];

  async createUser(userData: CreateUserDto): Promise<CreateUserDto> {
    const newUser = { id: Date.now(), ...userData };
    this.users.push(newUser);
    await this.addSendEmailJobToQueue(newUser);
    return newUser;
  }

  async getUserById(userId: number): Promise<any> {
    return this.users.find((user) => user.id === userId);
  }

  private async addSendEmailJobToQueue(user: CreateUserDto): Promise<void> {
    await this.emailQueue.add(
      'send-welcome-email',
      {
        email: user.email,
        name: user.name,
      },
      {
        delay: 11000,
        attempts: 1,
      },
    );
  }
}
