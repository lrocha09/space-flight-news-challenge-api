import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class JobsService {
  private readonly logger = new Logger(JobsService.name);

  constructor(
    @InjectQueue('synchronizeArticles')
    private readonly synchronizeArticles: Queue,
  ) {}

  @Cron('0 9 * * *', {
    name: 'JobsService',
    timeZone: 'America/Bahia',
  })
  async handleCron(): Promise<void> {
    this.logger.debug('---------- Cron started -----------');

    await this.synchronizeArticles.add('synchronize', {
      message: 'sinchronize articles',
    });
  }
}
