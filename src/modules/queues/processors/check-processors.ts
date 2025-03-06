import { Processor, WorkerHost } from '@nestjs/bullmq';
import { JOB_NAME, JOB_QUEUE } from '../constants';
import { CommandBus } from '@nestjs/cqrs';
import { Job } from 'bullmq';
import { CheckCommand } from '../commands';
import { Logger } from '@nestjs/common';

@Processor(JOB_QUEUE)
export class JobQueueProcessor extends WorkerHost {
  private readonly logger = new Logger(JobQueueProcessor.name, {
    timestamp: true,
  });

  constructor(private readonly commandBus: CommandBus) {
    super();
  }

  async process(job: Job): Promise<void> {
    this.logger.log(`Start: ${job.queueName}::${job.name} job`);

    await job.log(JSON.stringify(job.data));

    switch (job.name) {
      case JOB_NAME.check:
        await this.commandBus.execute(new CheckCommand());
        break;

      default:
        break;
    }
  }
}
