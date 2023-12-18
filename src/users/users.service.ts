import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class UsersService {
  constructor(
    private readonly mailerService: MailerService,
    @InjectQueue('email-queue') private emailQueue: Queue,
  ) {}
  private users = [];

  async createUser(userData: any): Promise<any> {
    const newUser = { id: Date.now(), ...userData };
    this.users.push(newUser);
    await this.addSendEmailJobToQueue(newUser);
    return newUser;
  }

  async getUserById(userId: number): Promise<any> {
    return this.users.find((user) => user.id === userId);
  }

  private async addSendEmailJobToQueue(user: any): Promise<void> {
    await this.emailQueue.add(
      'send-welcome-email',
      {
        email: user.email,
        name: user.name,
      },
      {
        delay: 2000,
        attempts: 1,
      },
    );
  }

  private async sendWelcomeEmail(user: any): Promise<void> {
    await this.mailerService.sendMail({
      to: user.email,
      from: 'e-mail test <bull@bull.com>',
      subject: 'Bem-vindo à Nossa Plataforma!',
      template: 'welcome',
      context: {
        name: user.name,
      },
    });
  }
}
