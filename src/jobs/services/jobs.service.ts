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

  // O que significa '0 9 * * *'? Extrair esta string para uma constante dizendo com palavras a frequência que ela representa
  // Isso impedirá que no futuro você precise ir na documentação do cron para decifrar o sifnificado deste código
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
