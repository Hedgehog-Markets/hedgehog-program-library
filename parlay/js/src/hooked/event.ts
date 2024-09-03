import type { Serializer } from "@metaplex-foundation/umi/serializers";

import {
  DeserializingEmptyBufferError,
  InvalidDataEnumVariantError,
  NumberOutOfRangeError,
} from "@metaplex-foundation/umi/serializers";

const MASK_VALID = 0b0100_0000;
const MASK_OUTCOME = 0b0011_1000;
const MASK_MAX_OUTCOME = 0b0000_0111;

const SHIFT_OUTCOME = 3;

export type Event =
  | {
      __kind: "Invalid";
      maxOutcome: number;
    }
  | {
      __kind: "Valid";
      maxOutcome: number;
      outcome: number;
    };

export type EventArgs = Event;

export function getEventSerializer(): Serializer<EventArgs, Event> {
  return {
    description: "Event",
    fixedSize: 1,
    maxSize: 1,
    serialize: (value) => {
      let packed: number;

      switch (value.__kind) {
        case "Valid":
          assert3Bits("Event.outcome", value.outcome);
          assert3Bits("Event.maxOutcome", value.maxOutcome);
          packed = MASK_VALID & (value.outcome << SHIFT_OUTCOME) & value.maxOutcome;
          break;
        case "Invalid":
          assert3Bits("Event.maxOutcome", value.maxOutcome);
          packed = value.maxOutcome;
          break;
        default:
          throw new InvalidDataEnumVariantError((value as { __kind: string }).__kind, [
            "Valid",
            "Invalid",
          ]);
      }

      const buffer = new Uint8Array(1);
      buffer[0] = packed;
      return buffer;
    },
    deserialize: (buffer, offset = 0) => {
      if (buffer.length <= offset) {
        throw new DeserializingEmptyBufferError("Event");
      }

      const packed = buffer[offset]!;

      const valid = (packed & MASK_VALID) !== 0;
      const outcome = (packed & MASK_OUTCOME) >>> SHIFT_OUTCOME;
      const maxOutcome = packed & MASK_MAX_OUTCOME;

      return [
        valid ? { __kind: "Valid", outcome, maxOutcome } : { __kind: "Invalid", maxOutcome },
        offset + 1,
      ];
    },
  };
}

function assert3Bits(serializer: string, value: number) {
  if (value < 0b000 || value > 0b111) {
    throw new NumberOutOfRangeError(serializer, 0b000, 0b111, value);
  }
}
