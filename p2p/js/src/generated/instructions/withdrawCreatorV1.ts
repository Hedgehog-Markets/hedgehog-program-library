/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/kinobi-so/kinobi
 */

import type { ResolvedAccount, ResolvedAccountsWithIndices } from "../shared";
import type { Context, Pda, PublicKey, Signer, TransactionBuilder } from "@metaplex-foundation/umi";
import type { Serializer } from "@metaplex-foundation/umi/serializers";

import { findAssociatedTokenPda } from "@metaplex-foundation/mpl-toolbox";
import { transactionBuilder } from "@metaplex-foundation/umi";
import { mapSerializer, struct, u8 } from "@metaplex-foundation/umi/serializers";

import { findDepositPda } from "../../hooked";
import { expectPublicKey, getAccountMetasAndSigners } from "../shared";

// Accounts.
export type WithdrawCreatorV1InstructionAccounts = {
  /** Market */
  market: PublicKey | Pda;
  /** Deposit token mint */
  mint: PublicKey | Pda;
  /** Deposit token account */
  deposit?: PublicKey | Pda;
  /** Creator token account */
  tokenAccount?: PublicKey | Pda;
  /** Creator wallet */
  wallet?: Signer;
  /** SPL token program */
  tokenProgram?: PublicKey | Pda;
};

// Data.
export type WithdrawCreatorV1InstructionData = { discriminator: number };

export type WithdrawCreatorV1InstructionDataArgs = {};

export function getWithdrawCreatorV1InstructionDataSerializer(): Serializer<
  WithdrawCreatorV1InstructionDataArgs,
  WithdrawCreatorV1InstructionData
> {
  return mapSerializer<WithdrawCreatorV1InstructionDataArgs, any, WithdrawCreatorV1InstructionData>(
    struct<WithdrawCreatorV1InstructionData>([["discriminator", u8()]], {
      description: "WithdrawCreatorV1InstructionData",
    }),
    (value) => ({ ...value, discriminator: 10 }),
  );
}

// Instruction.
export function withdrawCreatorV1(
  context: Pick<Context, "eddsa" | "identity" | "programs">,
  input: WithdrawCreatorV1InstructionAccounts,
): TransactionBuilder {
  // Program ID.
  const programId = context.programs.getPublicKey(
    "hplP2p",
    "P2PzLraW8YF87BxqZTZ5kgrfvzcrKGPnqUBNhqmcV9B",
  );

  // Accounts.
  const resolvedAccounts = {
    market: {
      index: 0,
      isWritable: true as boolean,
      value: input.market ?? null,
    },
    mint: { index: 1, isWritable: false as boolean, value: input.mint ?? null },
    deposit: {
      index: 2,
      isWritable: true as boolean,
      value: input.deposit ?? null,
    },
    tokenAccount: {
      index: 3,
      isWritable: true as boolean,
      value: input.tokenAccount ?? null,
    },
    wallet: {
      index: 4,
      isWritable: false as boolean,
      value: input.wallet ?? null,
    },
    tokenProgram: {
      index: 5,
      isWritable: false as boolean,
      value: input.tokenProgram ?? null,
    },
  } satisfies ResolvedAccountsWithIndices;

  // Default values.
  if (!resolvedAccounts.deposit.value) {
    resolvedAccounts.deposit.value = findDepositPda(context, {
      market: expectPublicKey(resolvedAccounts.market.value),
    });
  }
  if (!resolvedAccounts.wallet.value) {
    resolvedAccounts.wallet.value = context.identity;
  }
  if (!resolvedAccounts.tokenAccount.value) {
    resolvedAccounts.tokenAccount.value = findAssociatedTokenPda(context, {
      mint: expectPublicKey(resolvedAccounts.mint.value),
      owner: expectPublicKey(resolvedAccounts.wallet.value),
    });
  }
  if (!resolvedAccounts.tokenProgram.value) {
    resolvedAccounts.tokenProgram.value = context.programs.getPublicKey(
      "splToken",
      "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
    );
    resolvedAccounts.tokenProgram.isWritable = false;
  }

  // Accounts in order.
  const orderedAccounts: Array<ResolvedAccount> = Object.values(resolvedAccounts).sort(
    (a, b) => a.index - b.index,
  );

  // Keys and Signers.
  const [keys, signers] = getAccountMetasAndSigners(orderedAccounts, "programId", programId);

  // Data.
  const data = getWithdrawCreatorV1InstructionDataSerializer().serialize({});

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return transactionBuilder([
    { instruction: { keys, programId, data }, signers, bytesCreatedOnChain },
  ]);
}
