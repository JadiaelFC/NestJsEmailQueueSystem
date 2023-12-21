import {
  OnQueueActive,
  OnQueueCompleted,
  OnQueueProgress,
  OnQueueWaiting,
  Process,
  Processor,
} from '@nestjs/bull';
import { Job, JobId } from 'bull';
import { MailerService } from '@nestjs-modules/mailer';

@Processor('email-queue')
export class EmailConsumer {
  constructor(private readonly mailerService: MailerService) {}
  @Process('send-welcome-email')
  async sendWelcomeEmail(job: Job<any>) {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    const { email, name } = job.data;
    await this.mailerService.sendMail({
      to: email,
      subject: 'Bem-vindo à Nossa Plataforma!',
      template: 'welcome',
      context: { name: name },
    });
    return 'success';
  }

  @OnQueueCompleted()
  onQueueCompleted(job: Job) {
    console.log(`On Completed ${job.name}`);
  }

  @OnQueueProgress()
  onQueueProgress(job: Job) {
    console.log(`On Progress ${job.name}`);
  }

  @OnQueueActive()
  onQueueActive(job: Job) {
    console.log(`On Active ${job.name}`);
  }

  @OnQueueWaiting()
  onQueueWaiting(job: JobId) {
    console.log(`On Waiting ${job}`);
  }
}
