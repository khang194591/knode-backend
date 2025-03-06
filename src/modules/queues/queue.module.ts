import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';
import { BullBoardModule } from '@bull-board/nestjs';
import { BullModule, InjectQueue } from '@nestjs/bullmq';
import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { Queue } from 'bullmq';
import { CheckHandler } from './commands';
import { JOB_NAME, JOB_QUEUE } from './constants';
import { JobQueueProcessor } from './processors';

@Module({
  imports: [
    CqrsModule,
    BullModule.registerQueue({
      name: JOB_QUEUE,
    }),
    BullBoardModule.forFeature({
      name: JOB_QUEUE,
      adapter: BullMQAdapter,
    }),
  ],
  providers: [JobQueueProcessor, CheckHandler],
  exports: [BullModule],
})
export class JobQueueModule implements OnModuleInit {
  constructor(
    @InjectQueue(JOB_QUEUE)
    private readonly jobQueue: Queue,
    private readonly configService: ConfigService,
  ) {}

  async onModuleInit(): Promise<void> {
    await this.jobQueue.upsertJobScheduler(JOB_NAME.check, {
      jobId: JOB_NAME.check,
      pattern: '* * * * *',
    });
  }
}
