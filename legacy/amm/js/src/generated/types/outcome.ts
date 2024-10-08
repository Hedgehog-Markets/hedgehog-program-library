/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/kinobi-so/kinobi
 */

import type { Serializer } from "@metaplex-foundation/umi/serializers";

import { scalarEnum } from "@metaplex-foundation/umi/serializers";

export enum Outcome {
  Yes,
  No,
}

export type OutcomeArgs = Outcome;

export function getOutcomeSerializer(): Serializer<OutcomeArgs, Outcome> {
  return scalarEnum<Outcome>(Outcome, { description: "Outcome" }) as Serializer<
    OutcomeArgs,
    Outcome
  >;
}
