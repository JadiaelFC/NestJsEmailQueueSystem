import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { MailerService } from '@nestjs-modules/mailer';

@Processor('email-queue')
export class EmailConsumer {
  constructor(private readonly mailerService: MailerService) {}
  @Process('send-welcome-email') async sendWelcomeEmail(job: Job<any>) {
    const { email, name } = job.data;
    await this.mailerService.sendMail({
      to: email,
      from: 'e-mail test <bull@bull.com>',
      subject: 'Bem-vindo à Nossa Plataforma!',
      template: 'welcome',
      context: { name: name },
    });
  }
}
