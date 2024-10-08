/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import type { ResolvedAccount, ResolvedAccountsWithIndices } from "../shared";
import type { Context, Pda, PublicKey, Signer, TransactionBuilder } from "@metaplex-foundation/umi";
import type { Serializer } from "@metaplex-foundation/umi/serializers";

import { transactionBuilder } from "@metaplex-foundation/umi";
import { mapSerializer, struct, u8 } from "@metaplex-foundation/umi/serializers";

import { findUserV1Pda } from "../accounts";
import { expectPublicKey, getAccountMetasAndSigners } from "../shared";

// Accounts.
export interface CreateUserV1InstructionAccounts {
  /** User */
  user?: PublicKey | Pda;
  /** User wallet */
  wallet?: Signer;
  /** Payer */
  payer?: Signer;
  /** System program */
  systemProgram?: PublicKey | Pda;
}

// Data.
export interface CreateUserV1InstructionData {
  discriminator: number;
}

export interface CreateUserV1InstructionDataArgs {}

export function getCreateUserV1InstructionDataSerializer(): Serializer<
  CreateUserV1InstructionDataArgs,
  CreateUserV1InstructionData
> {
  return mapSerializer<CreateUserV1InstructionDataArgs, any, CreateUserV1InstructionData>(
    struct<CreateUserV1InstructionData>([["discriminator", u8()]], {
      description: "CreateUserV1InstructionData",
    }),
    (value) => ({ ...value, discriminator: 1 }),
  );
}

// Instruction.
export function createUserV1(
  context: Pick<Context, "eddsa" | "identity" | "payer" | "programs">,
  input: CreateUserV1InstructionAccounts,
): TransactionBuilder {
  // Program ID.
  const programId = context.programs.getPublicKey(
    "hplParlay",
    "PLYaNRbQs9GWyVQdcLrzPvvZu7NH4W2sneyHcEimLr7",
  );

  // Accounts.
  const resolvedAccounts = {
    user: { index: 0, isWritable: true as boolean, value: input.user ?? null },
    wallet: {
      index: 1,
      isWritable: false as boolean,
      value: input.wallet ?? null,
    },
    payer: {
      index: 2,
      isWritable: true as boolean,
      value: input.payer ?? null,
    },
    systemProgram: {
      index: 3,
      isWritable: false as boolean,
      value: input.systemProgram ?? null,
    },
  } satisfies ResolvedAccountsWithIndices;

  // Default values.
  if (!resolvedAccounts.wallet.value) {
    resolvedAccounts.wallet.value = context.identity;
  }
  if (!resolvedAccounts.user.value) {
    resolvedAccounts.user.value = findUserV1Pda(context, {
      wallet: expectPublicKey(resolvedAccounts.wallet.value),
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
  const data = getCreateUserV1InstructionDataSerializer().serialize({});

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return transactionBuilder([
    { instruction: { keys, programId, data }, signers, bytesCreatedOnChain },
  ]);
}
