import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

const everyDayAtNineOClock = '0 9 * * *';
@Injectable()
export class JobsService {
  private readonly logger = new Logger(JobsService.name);

  constructor(
    @InjectQueue('synchronizeArticles')
    private readonly synchronizeArticles: Queue,
  ) {}

  @Cron(everyDayAtNineOClock, {
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
