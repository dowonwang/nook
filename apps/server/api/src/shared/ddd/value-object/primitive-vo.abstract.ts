/**
 * 원시값 value object 추상 클래스
 *
 * string, number, boolean, bigint 타입만 equals 메소드 정상 동작
 */

type Primitive = string | number | boolean | bigint;

export abstract class PrimitiveValueObject<
  ValueType extends Primitive,
  SelfType extends PrimitiveValueObject<ValueType, SelfType>,
> {
  protected constructor(private readonly value: ValueType) {
    this.validation(value);
  }

  protected abstract validation(input: ValueType): void;

  equals(other: SelfType): boolean {
    return (
      this.value === other.getValue() && this.constructor === other.constructor
    );
  }

  getValue(): ValueType {
    return this.value;
  }
}
