import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class UsersService {
  constructor(private readonly mailerService: MailerService) {} // @InjectQueue('email-queue') private emailQueue: Queue, // private readonly mailerService: MailerService,
  private users = [];

  async createUser(userData: CreateUserDto): Promise<CreateUserDto> {
    const newUser = { id: Date.now(), ...userData };
    this.users.push(newUser);
    await this.mailerService.sendMail({
      to: newUser.email,
      subject: 'Bem-vindo à Nossa Plataforma!',
      template: 'welcome',
      context: { name: newUser.name },
    });
    return newUser;
  }

  async getUserById(userId: number): Promise<any> {
    return this.users.find((user) => user.id === userId);
  }
}
