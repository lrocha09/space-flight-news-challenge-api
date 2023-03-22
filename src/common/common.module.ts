import { Global, Module } from '@nestjs/common';
import { AxiosRequestsProvider } from './providers/axios-requests.provider';
import { UniqueIdentifier } from './utils/unique-identifier.util';

@Global()
@Module({
  imports: [],
  providers: [AxiosRequestsProvider, UniqueIdentifier],
  exports: [AxiosRequestsProvider, UniqueIdentifier],
})
export class CommonModule {}
