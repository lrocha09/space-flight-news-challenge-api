import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiGetStatusApp } from '../../swagger/decorators/api-get-status-app.decorator';
import { AppService } from '../services/app.service';

@ApiTags('Root')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiGetStatusApp()
  getStatusMessage() {
    return this.appService.getStatusMessage();
  }
}
