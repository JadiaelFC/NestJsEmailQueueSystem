import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { BullBoardModule } from '@bull-board/nestjs';
import { BullModule } from '@nestjs/bull';
import { BullAdapter } from '@bull-board/api/bullAdapter';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'email-queue',
    }),
    BullBoardModule.forFeature({
      name: 'email-queue',
      adapter: BullAdapter,
    }),
  ],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
