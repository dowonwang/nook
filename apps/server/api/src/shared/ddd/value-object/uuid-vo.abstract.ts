import { z } from 'zod';

import { InvalidUuid } from '$shared/ddd/errors/InvalidUuid.error';
import { PrimitiveValueObject } from '$shared/ddd/value-object/primitive-vo.abstract';

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
