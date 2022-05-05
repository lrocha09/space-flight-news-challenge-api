import { Injectable } from '@nestjs/common';
import { v4, validate } from 'uuid';

@Injectable()
export class UuidUtil {
  generate(): string {
    return v4();
  }

  validate(uuid: string): boolean {
    return validate(uuid);
  }
}
