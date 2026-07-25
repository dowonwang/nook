import { z } from 'zod';

import { PrimitiveValueObject } from './primitive-vo.abstract';
import { InvalidUuid } from '../errors/InvalidUuid.error';

const schema = z.uuidv7();

export abstract class Uuid<T extends Uuid<T>> extends PrimitiveValueObject<
  string,
  T
> {
  protected constructor(value: string) {
    super(value);
  }

  protected validation(input: string) {
    const vaildation = schema.safeParse(input);

    if (!vaildation.success) {
      throw new InvalidUuid(Uuid.name, { input });
    }
  }
}
