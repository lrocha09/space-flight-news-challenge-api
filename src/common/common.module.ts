import { Global, Module } from '@nestjs/common';
import { AxiosRequestsProvider } from './providers/axios-requests.provider';
import { UuidUtil } from './utils/uuid.util';

@Global()
@Module({
  imports: [],
  providers: [AxiosRequestsProvider, UuidUtil],
  exports: [AxiosRequestsProvider, UuidUtil],
})
export class CommonModule {}
