import {
  OnQueueCompleted,
  OnQueueFailed,
  Process,
  Processor,
} from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { SynchronizeArticlesService } from '../../articles/services/synchronize-articles.service';

@Processor('synchronizeArticles')
export class SynchronizeArticlesProcessor {
  private readonly logger = new Logger(SynchronizeArticlesProcessor.name);

  constructor(
    private readonly synchronizeArticlesService: SynchronizeArticlesService,
  ) {}

  @Process('synchronize')
  async handleSynchronize(job: Job): Promise<boolean> {
    this.EmitLoggerMessage(
      job.id.toString(),
      job.name,
      job.data.message,
      'Started',
    );

    await this.synchronizeArticlesService.execute();

    return true;
  }

  @OnQueueCompleted()
  handleCompleted(job: Job, result: any): void {
    this.EmitLoggerMessage(
      job.id.toString(),
      job.name,
      job.data.message,
      result && 'Ok',
    );
  }

  @OnQueueFailed()
  handleFailed(job: Job, error: Error): void {
    this.EmitLoggerMessage(
      job.id.toString(),
      job.name,
      job.data.message,
      error && 'Fail',
    );

    throw new Error(error.message);
  }

  private EmitLoggerMessage(
    id: string,
    name: string,
    message: string,
    status: string,
  ) {
    this.logger.debug(
      `Id: ${id} | name: ${name} | message: ${message} | status: ${status}`,
    );
  }
}
