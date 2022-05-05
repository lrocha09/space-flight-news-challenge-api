import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getStatusMessage() {
    return { message: 'Back-end Challenge 2021 🏅 - Space Flight News' };
  }
}
