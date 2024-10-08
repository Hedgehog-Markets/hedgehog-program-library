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
import { publicKey, transactionBuilder } from "@metaplex-foundation/umi";
import { mapSerializer, struct, u64, u8 } from "@metaplex-foundation/umi/serializers";

import { findDepositPda, findLuloUserPda } from "../../hooked";
import { findLuloPoolV1Pda, findUserPositionV1Pda } from "../accounts";
import { expectPublicKey, getAccountMetasAndSigners } from "../shared";

// Accounts.
export type DepositV1InstructionAccounts = {
  /** Market */
  market: PublicKey | Pda;
  /** User position */
  userPosition?: PublicKey | Pda;
  /** Deposit token mint */
  mint: PublicKey | Pda;
  /** Deposit token account */
  deposit?: PublicKey | Pda;
  /** User token account */
  tokenAccount?: PublicKey | Pda;
  /** User wallet */
  wallet?: Signer;
  /** Payer */
  payer?: Signer;
  /** LULO pool data */
  luloPool?: PublicKey | Pda;
  /** LULO user account */
  luloUser?: PublicKey | Pda;
  /** LULO deposit token account */
  luloDeposit: PublicKey | Pda;
  /** LULO promotion reserve */
  luloPromotionReserve?: PublicKey | Pda;
  /** LULO program */
  luloProgram?: PublicKey | Pda;
  /** SPL associated token program */
  ataProgram?: PublicKey | Pda;
  /** SPL token program */
  tokenProgram?: PublicKey | Pda;
  /** System program */
  systemProgram?: PublicKey | Pda;
};

// Data.
export type DepositV1InstructionData = {
  discriminator: number;
  option: number;
  amount: bigint;
};

export type DepositV1InstructionDataArgs = {
  option: number;
  amount: number | bigint;
};

export function getDepositV1InstructionDataSerializer(): Serializer<
  DepositV1InstructionDataArgs,
  DepositV1InstructionData
> {
  return mapSerializer<DepositV1InstructionDataArgs, any, DepositV1InstructionData>(
    struct<DepositV1InstructionData>(
      [
        ["discriminator", u8()],
        ["option", u8()],
        ["amount", u64()],
      ],
      { description: "DepositV1InstructionData" },
    ),
    (value) => ({ ...value, discriminator: 4 }),
  );
}

// Args.
export type DepositV1InstructionArgs = DepositV1InstructionDataArgs;

// Instruction.
export function depositV1(
  context: Pick<Context, "eddsa" | "identity" | "payer" | "programs">,
  input: DepositV1InstructionAccounts & DepositV1InstructionArgs,
): TransactionBuilder {
  // Program ID.
  const programId = context.programs.getPublicKey(
    "hplParimutuel",
    "PARrVs6F5egaNuz8g6pKJyU4ze3eX5xGZCFb3GLiVvu",
  );

  // Accounts.
  const resolvedAccounts = {
    market: {
      index: 0,
      isWritable: true as boolean,
      value: input.market ?? null,
    },
    userPosition: {
      index: 1,
      isWritable: true as boolean,
      value: input.userPosition ?? null,
    },
    mint: { index: 2, isWritable: false as boolean, value: input.mint ?? null },
    deposit: {
      index: 3,
      isWritable: true as boolean,
      value: input.deposit ?? null,
    },
    tokenAccount: {
      index: 4,
      isWritable: true as boolean,
      value: input.tokenAccount ?? null,
    },
    wallet: {
      index: 5,
      isWritable: false as boolean,
      value: input.wallet ?? null,
    },
    payer: {
      index: 6,
      isWritable: true as boolean,
      value: input.payer ?? null,
    },
    luloPool: {
      index: 7,
      isWritable: true as boolean,
      value: input.luloPool ?? null,
    },
    luloUser: {
      index: 8,
      isWritable: true as boolean,
      value: input.luloUser ?? null,
    },
    luloDeposit: {
      index: 9,
      isWritable: true as boolean,
      value: input.luloDeposit ?? null,
    },
    luloPromotionReserve: {
      index: 10,
      isWritable: true as boolean,
      value: input.luloPromotionReserve ?? null,
    },
    luloProgram: {
      index: 11,
      isWritable: false as boolean,
      value: input.luloProgram ?? null,
    },
    ataProgram: {
      index: 12,
      isWritable: false as boolean,
      value: input.ataProgram ?? null,
    },
    tokenProgram: {
      index: 13,
      isWritable: false as boolean,
      value: input.tokenProgram ?? null,
    },
    systemProgram: {
      index: 14,
      isWritable: false as boolean,
      value: input.systemProgram ?? null,
    },
  } satisfies ResolvedAccountsWithIndices;

  // Arguments.
  const resolvedArgs: DepositV1InstructionArgs = { ...input };

  // Default values.
  if (!resolvedAccounts.wallet.value) {
    resolvedAccounts.wallet.value = context.identity;
  }
  if (!resolvedAccounts.userPosition.value) {
    resolvedAccounts.userPosition.value = findUserPositionV1Pda(context, {
      market: expectPublicKey(resolvedAccounts.market.value),
      wallet: expectPublicKey(resolvedAccounts.wallet.value),
    });
  }
  if (!resolvedAccounts.deposit.value) {
    resolvedAccounts.deposit.value = findDepositPda(context, {
      market: expectPublicKey(resolvedAccounts.market.value),
    });
  }
  if (!resolvedAccounts.tokenAccount.value) {
    resolvedAccounts.tokenAccount.value = findAssociatedTokenPda(context, {
      mint: expectPublicKey(resolvedAccounts.mint.value),
      owner: expectPublicKey(resolvedAccounts.wallet.value),
    });
  }
  if (!resolvedAccounts.payer.value) {
    resolvedAccounts.payer.value = context.payer;
  }
  if (!resolvedAccounts.luloPool.value) {
    resolvedAccounts.luloPool.value = findLuloPoolV1Pda(context);
  }
  if (!resolvedAccounts.luloUser.value) {
    resolvedAccounts.luloUser.value = findLuloUserPda(context, {
      owner: expectPublicKey(resolvedAccounts.luloPool.value),
    });
  }
  if (!resolvedAccounts.luloPromotionReserve.value) {
    resolvedAccounts.luloPromotionReserve.value = publicKey(
      "4NCKkwUCBRcu7TGxDaEZ6Uw6TvzdDbnvSuYbXLzrLnzv",
    );
  }
  if (!resolvedAccounts.luloProgram.value) {
    resolvedAccounts.luloProgram.value = context.programs.getPublicKey(
      "lulo",
      "FL3X2pRsQ9zHENpZSKDRREtccwJuei8yg9fwDu9UN69Q",
    );
    resolvedAccounts.luloProgram.isWritable = false;
  }
  if (!resolvedAccounts.ataProgram.value) {
    resolvedAccounts.ataProgram.value = context.programs.getPublicKey(
      "splAssociatedToken",
      "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL",
    );
    resolvedAccounts.ataProgram.isWritable = false;
  }
  if (!resolvedAccounts.tokenProgram.value) {
    resolvedAccounts.tokenProgram.value = context.programs.getPublicKey(
      "splToken",
      "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
    );
    resolvedAccounts.tokenProgram.isWritable = false;
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
  const data = getDepositV1InstructionDataSerializer().serialize(resolvedArgs);

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return transactionBuilder([
    { instruction: { keys, programId, data }, signers, bytesCreatedOnChain },
  ]);
}
