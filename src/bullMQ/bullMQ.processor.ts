import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { QUEUE_NAME } from './bullMQ.constants';
import { MailerService } from '@nestjs-modules/mailer';

@Processor(QUEUE_NAME)
export class BullMQProcessor extends WorkerHost {
  constructor(private readonly mailerService: MailerService) {
    super();
  }

  async process(job: Job<any>): Promise<any> {
    switch (job.name) {
      case 'send-welcome-email':
        return this.emailConsumer(job);
      default:
        throw new Error(`Process ${job.name} not implemented`);
    }
  }

  async emailConsumer(job: Job<any>): Promise<any> {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    const { email, name } = job.data;
    await this.mailerService.sendMail({
      to: email,
      subject: 'Bem-vindo à Nossa Plataforma!',
      template: 'welcome',
      context: { name: name },
    });
    return Promise.resolve(`${QUEUE_NAME}-${job.id}`);
  }
}
