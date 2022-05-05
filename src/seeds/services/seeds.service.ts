import { Injectable, Logger } from '@nestjs/common';
import { SynchronizeArticlesService } from '../../articles/services/synchronize-articles.service';

@Injectable()
export class SeedsService {
  private logger = new Logger(SeedsService.name);

  constructor(
    private readonly synchronizeArticlesService: SynchronizeArticlesService,
  ) {}

  async start(): Promise<void> {
    this.logger.log(`Starting seeds`);
    const init = new Date().getTime();

    this.synchronizeArticlesService.execute();

    const end = new Date().getTime() - init;
    this.logger.log(`Finished seeds in ${end}ms`);
  }
}
