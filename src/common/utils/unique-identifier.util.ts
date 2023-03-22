import { BadRequestException, Injectable } from '@nestjs/common';
import { v4, validate } from 'uuid';

@Injectable()
export class UniqueIdentifier {
  generate(): string {
    return v4();
  }

  validate(id: string): void {
    if (!validate(id)) {
      throw new BadRequestException('Identificador inválido.');
    }
  }
}
