/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/kinobi-so/kinobi
 */

import type { ResolvedAccount, ResolvedAccountsWithIndices } from "../shared";
import type { UncheckedSwapFees, UncheckedSwapFeesArgs } from "../types";
import type { Context, Pda, PublicKey, Signer, TransactionBuilder } from "@metaplex-foundation/umi";
import type { Serializer } from "@metaplex-foundation/umi/serializers";

import { transactionBuilder } from "@metaplex-foundation/umi";
import { bytes, mapSerializer, struct, u8 } from "@metaplex-foundation/umi/serializers";

import { findCreatorMetadataPda } from "../accounts";
import { expectPublicKey, getAccountMetasAndSigners } from "../shared";
import { getUncheckedSwapFeesSerializer } from "../types";

// Accounts.
export type InitializeSwapInstructionAccounts = {
  creator: Signer;
  market: PublicKey | Pda;
  creatorMetadata?: PublicKey | Pda;
  payer?: Signer;
  swap: PublicKey | Pda;
  underlyingSwap: PublicKey | Pda;
  systemProgram?: PublicKey | Pda;
};

// Data.
export type InitializeSwapInstructionData = {
  discriminator: Uint8Array;
  fees: UncheckedSwapFees;
  nonce: number;
};

export type InitializeSwapInstructionDataArgs = {
  fees: UncheckedSwapFeesArgs;
  nonce: number;
};

export function getInitializeSwapInstructionDataSerializer(): Serializer<
  InitializeSwapInstructionDataArgs,
  InitializeSwapInstructionData
> {
  return mapSerializer<InitializeSwapInstructionDataArgs, any, InitializeSwapInstructionData>(
    struct<InitializeSwapInstructionData>(
      [
        ["discriminator", bytes({ size: 8 })],
        ["fees", getUncheckedSwapFeesSerializer()],
        ["nonce", u8()],
      ],
      { description: "InitializeSwapInstructionData" },
    ),
    (value) => ({
      ...value,
      discriminator: new Uint8Array([6, 45, 202, 225, 42, 39, 49, 249]),
    }),
  );
}

// Args.
export type InitializeSwapInstructionArgs = InitializeSwapInstructionDataArgs;

// Instruction.
export function initializeSwap(
  context: Pick<Context, "eddsa" | "payer" | "programs">,
  input: InitializeSwapInstructionAccounts & InitializeSwapInstructionArgs,
): TransactionBuilder {
  // Program ID.
  const programId = context.programs.getPublicKey(
    "hhAmm",
    "Hr4whNgXr3yZsJvx3TVSwfsFgXuSEPB1xKmvgrtLhsrM",
  );

  // Accounts.
  const resolvedAccounts = {
    creator: {
      index: 0,
      isWritable: false as boolean,
      value: input.creator ?? null,
    },
    market: {
      index: 1,
      isWritable: false as boolean,
      value: input.market ?? null,
    },
    creatorMetadata: {
      index: 2,
      isWritable: true as boolean,
      value: input.creatorMetadata ?? null,
    },
    payer: {
      index: 3,
      isWritable: true as boolean,
      value: input.payer ?? null,
    },
    swap: { index: 4, isWritable: true as boolean, value: input.swap ?? null },
    underlyingSwap: {
      index: 5,
      isWritable: false as boolean,
      value: input.underlyingSwap ?? null,
    },
    systemProgram: {
      index: 6,
      isWritable: false as boolean,
      value: input.systemProgram ?? null,
    },
  } satisfies ResolvedAccountsWithIndices;

  // Arguments.
  const resolvedArgs: InitializeSwapInstructionArgs = { ...input };

  // Default values.
  if (!resolvedAccounts.creatorMetadata.value) {
    resolvedAccounts.creatorMetadata.value = findCreatorMetadataPda(context, {
      creator: expectPublicKey(resolvedAccounts.creator.value),
    });
  }
  if (!resolvedAccounts.payer.value) {
    resolvedAccounts.payer.value = context.payer;
  }
  if (!resolvedAccounts.systemProgram.value) {
    resolvedAccounts.systemProgram.value = context.programs.getPublicKey(
      "splSystem",
      "11111111111111111111111111111111",
    );
    resolvedAccounts.systemProgram.isWritable = false;
  }

  // Accounts in order.
  const orderedAccounts: Array<ResolvedAccount> = Object.values(resolvedAccounts).sort(
    (a, b) => a.index - b.index,
  );

  // Keys and Signers.
  const [keys, signers] = getAccountMetasAndSigners(orderedAccounts, "programId", programId);

  // Data.
  const data = getInitializeSwapInstructionDataSerializer().serialize(resolvedArgs);

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return transactionBuilder([
    { instruction: { keys, programId, data }, signers, bytesCreatedOnChain },
  ]);
}
