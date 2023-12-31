import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailerModule as NestMailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import { BullModule as BullMQModule } from '@nestjs/bullmq';
import { BullBoardModule } from '@bull-board/nestjs';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';
import { QUEUE_NAME as BULLMQ_QUEUE_NAME } from '../bullMQ/bullMQ.constants';
import { BullMQProcessor } from '../bullMQ/bullMQ.processor';
import { BullMQEventsListener } from '../bullMQ/bullMQ.eventsListener';

@Module({
  imports: [
    BullMQModule.registerQueue({
      name: BULLMQ_QUEUE_NAME,
    }),
    BullBoardModule.forFeature({
      name: BULLMQ_QUEUE_NAME,
      adapter: BullMQAdapter,
    }),
    NestMailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: configService.get<string>('MAIL_HOST'),
          port: +configService.get<number>('MAIL_PORT'),
          secure: false,
          auth: {
            user: configService.get<string>('MAIL_USERNAME'),
            pass: configService.get<string>('MAIL_PASSWORD'),
          },
          ignoreTLS: true,
        },
        defaults: {
          from: '"No Reply" <no-reply@bull.com>',
        },
        template: {
          dir: join(__dirname, '..', 'mailer', 'templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [UsersService, BullMQProcessor, BullMQEventsListener],
  controllers: [UsersController],
})
export class UsersModule {}
