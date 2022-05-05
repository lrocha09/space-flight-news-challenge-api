import { Module } from '@nestjs/common';
import { SwaggerSetupService } from './services/swagger-setup.service';

@Module({
  providers: [SwaggerSetupService],
  exports: [SwaggerSetupService],
})
export class SwaggerModule {}
