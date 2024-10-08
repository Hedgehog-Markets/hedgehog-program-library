/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/kinobi-so/kinobi
 */

import type { ResolvedAccount, ResolvedAccountsWithIndices } from "../shared";
import type { Outcome, OutcomeArgs } from "../types";
import type { Context, Pda, PublicKey, Signer, TransactionBuilder } from "@metaplex-foundation/umi";
import type { Serializer } from "@metaplex-foundation/umi/serializers";

import { transactionBuilder } from "@metaplex-foundation/umi";
import { bytes, mapSerializer, struct, u16, u64 } from "@metaplex-foundation/umi/serializers";

import { findGlobalStatePda } from "../accounts";
import { getAccountMetasAndSigners } from "../shared";
import { getOutcomeSerializer } from "../types";

// Accounts.
export type SellInstructionAccounts = {
  swap: PublicKey | Pda;
  creatorMetadata: PublicKey | Pda;
  underlyingSwap: PublicKey | Pda;
  swapAuthority: PublicKey | Pda;
  userTransferAuthority: Signer;
  tempTokenAccount: Signer;
  userQuoteAccount: PublicKey | Pda;
  userYesAccount: PublicKey | Pda;
  userNoAccount: PublicKey | Pda;
  swapTokenA: PublicKey | Pda;
  swapTokenB: PublicKey | Pda;
  poolMint: PublicKey | Pda;
  underlyingSwapFeeAccount: PublicKey | Pda;
  market: PublicKey | Pda;
  marketCollateral: PublicKey | Pda;
  quoteToken: PublicKey | Pda;
  yesToken: PublicKey | Pda;
  noToken: PublicKey | Pda;
  marketFeeAccount: PublicKey | Pda;
  marketCreatorMetadata: PublicKey | Pda;
  protocolFeeAccount: PublicKey | Pda;
  frontendFeeAccount: PublicKey | Pda;
  globalState?: PublicKey | Pda;
  payer?: Signer;
  outcomeProgram?: PublicKey | Pda;
  tokenProgram?: PublicKey | Pda;
  swapProgram?: PublicKey | Pda;
  systemProgram?: PublicKey | Pda;
};

// Data.
export type SellInstructionData = {
  discriminator: Uint8Array;
  amount: bigint;
  amountToSwap: bigint;
  maxBurnAmount: bigint;
  minAmountOut: bigint;
  outcome: Outcome;
  frontendFee: number;
};

export type SellInstructionDataArgs = {
  amount: number | bigint;
  amountToSwap: number | bigint;
  maxBurnAmount: number | bigint;
  minAmountOut: number | bigint;
  outcome: OutcomeArgs;
  frontendFee: number;
};

export function getSellInstructionDataSerializer(): Serializer<
  SellInstructionDataArgs,
  SellInstructionData
> {
  return mapSerializer<SellInstructionDataArgs, any, SellInstructionData>(
    struct<SellInstructionData>(
      [
        ["discriminator", bytes({ size: 8 })],
        ["amount", u64()],
        ["amountToSwap", u64()],
        ["maxBurnAmount", u64()],
        ["minAmountOut", u64()],
        ["outcome", getOutcomeSerializer()],
        ["frontendFee", u16()],
      ],
      { description: "SellInstructionData" },
    ),
    (value) => ({
      ...value,
      discriminator: new Uint8Array([51, 230, 133, 164, 1, 127, 131, 173]),
    }),
  );
}

// Args.
export type SellInstructionArgs = SellInstructionDataArgs;

// Instruction.
export function sell(
  context: Pick<Context, "eddsa" | "payer" | "programs">,
  input: SellInstructionAccounts & SellInstructionArgs,
): TransactionBuilder {
  // Program ID.
  const programId = context.programs.getPublicKey(
    "hhAmm",
    "Hr4whNgXr3yZsJvx3TVSwfsFgXuSEPB1xKmvgrtLhsrM",
  );

  // Accounts.
  const resolvedAccounts = {
    swap: { index: 0, isWritable: true as boolean, value: input.swap ?? null },
    creatorMetadata: {
      index: 1,
      isWritable: false as boolean,
      value: input.creatorMetadata ?? null,
    },
    underlyingSwap: {
      index: 2,
      isWritable: false as boolean,
      value: input.underlyingSwap ?? null,
    },
    swapAuthority: {
      index: 3,
      isWritable: false as boolean,
      value: input.swapAuthority ?? null,
    },
    userTransferAuthority: {
      index: 4,
      isWritable: false as boolean,
      value: input.userTransferAuthority ?? null,
    },
    tempTokenAccount: {
      index: 5,
      isWritable: true as boolean,
      value: input.tempTokenAccount ?? null,
    },
    userQuoteAccount: {
      index: 6,
      isWritable: true as boolean,
      value: input.userQuoteAccount ?? null,
    },
    userYesAccount: {
      index: 7,
      isWritable: true as boolean,
      value: input.userYesAccount ?? null,
    },
    userNoAccount: {
      index: 8,
      isWritable: true as boolean,
      value: input.userNoAccount ?? null,
    },
    swapTokenA: {
      index: 9,
      isWritable: true as boolean,
      value: input.swapTokenA ?? null,
    },
    swapTokenB: {
      index: 10,
      isWritable: true as boolean,
      value: input.swapTokenB ?? null,
    },
    poolMint: {
      index: 11,
      isWritable: true as boolean,
      value: input.poolMint ?? null,
    },
    underlyingSwapFeeAccount: {
      index: 12,
      isWritable: true as boolean,
      value: input.underlyingSwapFeeAccount ?? null,
    },
    market: {
      index: 13,
      isWritable: false as boolean,
      value: input.market ?? null,
    },
    marketCollateral: {
      index: 14,
      isWritable: true as boolean,
      value: input.marketCollateral ?? null,
    },
    quoteToken: {
      index: 15,
      isWritable: false as boolean,
      value: input.quoteToken ?? null,
    },
    yesToken: {
      index: 16,
      isWritable: true as boolean,
      value: input.yesToken ?? null,
    },
    noToken: {
      index: 17,
      isWritable: true as boolean,
      value: input.noToken ?? null,
    },
    marketFeeAccount: {
      index: 18,
      isWritable: true as boolean,
      value: input.marketFeeAccount ?? null,
    },
    marketCreatorMetadata: {
      index: 19,
      isWritable: false as boolean,
      value: input.marketCreatorMetadata ?? null,
    },
    protocolFeeAccount: {
      index: 20,
      isWritable: true as boolean,
      value: input.protocolFeeAccount ?? null,
    },
    frontendFeeAccount: {
      index: 21,
      isWritable: true as boolean,
      value: input.frontendFeeAccount ?? null,
    },
    globalState: {
      index: 22,
      isWritable: false as boolean,
      value: input.globalState ?? null,
    },
    payer: {
      index: 23,
      isWritable: true as boolean,
      value: input.payer ?? null,
    },
    outcomeProgram: {
      index: 24,
      isWritable: false as boolean,
      value: input.outcomeProgram ?? null,
    },
    tokenProgram: {
      index: 25,
      isWritable: false as boolean,
      value: input.tokenProgram ?? null,
    },
    swapProgram: {
      index: 26,
      isWritable: false as boolean,
      value: input.swapProgram ?? null,
    },
    systemProgram: {
      index: 27,
      isWritable: false as boolean,
      value: input.systemProgram ?? null,
    },
  } satisfies ResolvedAccountsWithIndices;

  // Arguments.
  const resolvedArgs: SellInstructionArgs = { ...input };

  // Default values.
  if (!resolvedAccounts.globalState.value) {
    resolvedAccounts.globalState.value = findGlobalStatePda(context);
  }
  if (!resolvedAccounts.payer.value) {
    resolvedAccounts.payer.value = context.payer;
  }
  if (!resolvedAccounts.outcomeProgram.value) {
    resolvedAccounts.outcomeProgram.value = context.programs.getPublicKey(
      "hhOutcomeTokens",
      "D8vMVKonxkbBtAXAxBwPPWyTfon8337ARJmHvwtsF98G",
    );
    resolvedAccounts.outcomeProgram.isWritable = false;
  }
  if (!resolvedAccounts.tokenProgram.value) {
    resolvedAccounts.tokenProgram.value = context.programs.getPublicKey(
      "splToken",
      "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
    );
    resolvedAccounts.tokenProgram.isWritable = false;
  }
  if (!resolvedAccounts.swapProgram.value) {
    resolvedAccounts.swapProgram.value = context.programs.getPublicKey(
      "hhTokenSwap",
      "2ZznCMfx2XP43zaPw9R9wKnjXWiEeEexyhdBPv3UqDtD",
    );
    resolvedAccounts.swapProgram.isWritable = false;
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
  const data = getSellInstructionDataSerializer().serialize(resolvedArgs);

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return transactionBuilder([
    { instruction: { keys, programId, data }, signers, bytesCreatedOnChain },
  ]);
}
