import type {
  BaseSerializerOptions,
  NumberSerializerOptions,
  Serializer,
} from "@metaplex-foundation/umi/serializers";

import {
  i128,
  i16,
  i32,
  i64,
  i8,
  u128,
  u16,
  u32,
  u64,
  u8,
} from "@metaplex-foundation/umi/serializers";

export type NonZeroU8 = number;
export type NonZeroU16 = number;
export type NonZeroU32 = number;
export type NonZeroU64 = bigint;
export type NonZeroU128 = bigint;

export type NonZeroU8Args = number;
export type NonZeroU16Args = number;
export type NonZeroU32Args = number;
export type NonZeroU64Args = number | bigint;
export type NonZeroU128Args = number | bigint;

export const getNonZeroU8Serializer = nonZeroSerializer("NonZeroU8", u8);
export const getNonZeroU16Serializer = nonZeroSerializer("NonZeroU16", u16);
export const getNonZeroU32Serializer = nonZeroSerializer("NonZeroU32", u32);
export const getNonZeroU64Serializer = nonZeroSerializer("NonZeroU64", u64);
export const getNonZeroU128Serializer = nonZeroSerializer("NonZeroU128", u128);

export type NonZeroI8 = number;
export type NonZeroI16 = number;
export type NonZeroI32 = number;
export type NonZeroI64 = bigint;
export type NonZeroI128 = bigint;

export type NonZeroI8Args = number;
export type NonZeroI16Args = number;
export type NonZeroI32Args = number;
export type NonZeroI64Args = number | bigint;
export type NonZeroI128Args = number | bigint;

export const getNonZeroI8Serializer = nonZeroSerializer("NonZeroI8", i8);
export const getNonZeroI16Serializer = nonZeroSerializer("NonZeroI16", i16);
export const getNonZeroI32Serializer = nonZeroSerializer("NonZeroI32", i32);
export const getNonZeroI64Serializer = nonZeroSerializer("NonZeroI64", i64);
export const getNonZeroI128Serializer = nonZeroSerializer("NonZeroI128", i128);

export class NonZeroError extends RangeError {
  override readonly name: string = "NonZeroError";

  constructor(serializer: string) {
    super(`Serializer [${serializer}] expected number to be non-zero.`);
  }
}

function nonZeroSerializer<
  O extends BaseSerializerOptions | NumberSerializerOptions,
  From extends number | bigint,
  To extends From,
>(name: string, fn: (options?: O) => Serializer<From, To>): (options?: O) => Serializer<From, To> {
  return (options) => {
    const customDescription = options?.description !== undefined;

    const serializer = fn(options);

    return {
      description: customDescription
        ? serializer.description
        : `nonZero(${serializer.description})`,
      fixedSize: serializer.fixedSize,
      maxSize: serializer.maxSize,
      serialize: (value) => {
        if (value === 0 || value === 0n) {
          throw new NonZeroError(name);
        }
        return serializer.serialize(value);
      },
      deserialize: (buffer, offset) => serializer.deserialize(buffer, offset),
    };
  };
}
