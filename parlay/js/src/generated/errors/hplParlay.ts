/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import type { Program } from "@metaplex-foundation/umi";

import { ProgramError } from "@metaplex-foundation/umi";

type ProgramErrorConstructor = new (program: Program, cause?: Error) => ProgramError;
const codeToErrorMap = new Map<number, ProgramErrorConstructor>();
const nameToErrorMap = new Map<string, ProgramErrorConstructor>();

/** DeserializationError: Failed to deserialize account */
export class DeserializationErrorError extends ProgramError {
  override readonly name: string = "DeserializationError";

  readonly code: number = 0x0; // 0

  constructor(program: Program, cause?: Error) {
    super("Failed to deserialize account", program, cause);
  }
}
codeToErrorMap.set(0x0, DeserializationErrorError);
nameToErrorMap.set("DeserializationError", DeserializationErrorError);

/** SerializationError: Failed to serialize account */
export class SerializationErrorError extends ProgramError {
  override readonly name: string = "SerializationError";

  readonly code: number = 0x1; // 1

  constructor(program: Program, cause?: Error) {
    super("Failed to serialize account", program, cause);
  }
}
codeToErrorMap.set(0x1, SerializationErrorError);
nameToErrorMap.set("SerializationError", SerializationErrorError);

/** InvalidBps: Invalid basis points value */
export class InvalidBpsError extends ProgramError {
  override readonly name: string = "InvalidBps";

  readonly code: number = 0x2; // 2

  constructor(program: Program, cause?: Error) {
    super("Invalid basis points value", program, cause);
  }
}
codeToErrorMap.set(0x2, InvalidBpsError);
nameToErrorMap.set("InvalidBps", InvalidBpsError);

/** InvalidOutcome: Outcome does not fall within choices for event */
export class InvalidOutcomeError extends ProgramError {
  override readonly name: string = "InvalidOutcome";

  readonly code: number = 0x3; // 3

  constructor(program: Program, cause?: Error) {
    super("Outcome does not fall within choices for event", program, cause);
  }
}
codeToErrorMap.set(0x3, InvalidOutcomeError);
nameToErrorMap.set("InvalidOutcome", InvalidOutcomeError);

/** InvalidNumberOfOutcomes: Events must have at least 2 and at most 8 outcomes */
export class InvalidNumberOfOutcomesError extends ProgramError {
  override readonly name: string = "InvalidNumberOfOutcomes";

  readonly code: number = 0x4; // 4

  constructor(program: Program, cause?: Error) {
    super("Events must have at least 2 and at most 8 outcomes", program, cause);
  }
}
codeToErrorMap.set(0x4, InvalidNumberOfOutcomesError);
nameToErrorMap.set("InvalidNumberOfOutcomes", InvalidNumberOfOutcomesError);

/** NoEvents: Market must have at least 1 event */
export class NoEventsError extends ProgramError {
  override readonly name: string = "NoEvents";

  readonly code: number = 0x5; // 5

  constructor(program: Program, cause?: Error) {
    super("Market must have at least 1 event", program, cause);
  }
}
codeToErrorMap.set(0x5, NoEventsError);
nameToErrorMap.set("NoEvents", NoEventsError);

/** MarketClosed: Market is closed */
export class MarketClosedError extends ProgramError {
  override readonly name: string = "MarketClosed";

  readonly code: number = 0x6; // 6

  constructor(program: Program, cause?: Error) {
    super("Market is closed", program, cause);
  }
}
codeToErrorMap.set(0x6, MarketClosedError);
nameToErrorMap.set("MarketClosed", MarketClosedError);

/** MarketNotResolved: Market is not resolved */
export class MarketNotResolvedError extends ProgramError {
  override readonly name: string = "MarketNotResolved";

  readonly code: number = 0x7; // 7

  constructor(program: Program, cause?: Error) {
    super("Market is not resolved", program, cause);
  }
}
codeToErrorMap.set(0x7, MarketNotResolvedError);
nameToErrorMap.set("MarketNotResolved", MarketNotResolvedError);

/** MarketAlreadyResolved: Market already resolved */
export class MarketAlreadyResolvedError extends ProgramError {
  override readonly name: string = "MarketAlreadyResolved";

  readonly code: number = 0x8; // 8

  constructor(program: Program, cause?: Error) {
    super("Market already resolved", program, cause);
  }
}
codeToErrorMap.set(0x8, MarketAlreadyResolvedError);
nameToErrorMap.set("MarketAlreadyResolved", MarketAlreadyResolvedError);

/** MarketNotInvalid: Market is not invalid */
export class MarketNotInvalidError extends ProgramError {
  override readonly name: string = "MarketNotInvalid";

  readonly code: number = 0x9; // 9

  constructor(program: Program, cause?: Error) {
    super("Market is not invalid", program, cause);
  }
}
codeToErrorMap.set(0x9, MarketNotInvalidError);
nameToErrorMap.set("MarketNotInvalid", MarketNotInvalidError);

/** AlreadyClaimed: Already claimed */
export class AlreadyClaimedError extends ProgramError {
  override readonly name: string = "AlreadyClaimed";

  readonly code: number = 0xa; // 10

  constructor(program: Program, cause?: Error) {
    super("Already claimed", program, cause);
  }
}
codeToErrorMap.set(0xa, AlreadyClaimedError);
nameToErrorMap.set("AlreadyClaimed", AlreadyClaimedError);

/** NotHighScore: Only entries with the highest score can claim winnings */
export class NotHighScoreError extends ProgramError {
  override readonly name: string = "NotHighScore";

  readonly code: number = 0xb; // 11

  constructor(program: Program, cause?: Error) {
    super("Only entries with the highest score can claim winnings", program, cause);
  }
}
codeToErrorMap.set(0xb, NotHighScoreError);
nameToErrorMap.set("NotHighScore", NotHighScoreError);

/** InvalidCloseTimestamp: Close timestamp is in the past */
export class InvalidCloseTimestampError extends ProgramError {
  override readonly name: string = "InvalidCloseTimestamp";

  readonly code: number = 0xc; // 12

  constructor(program: Program, cause?: Error) {
    super("Close timestamp is in the past", program, cause);
  }
}
codeToErrorMap.set(0xc, InvalidCloseTimestampError);
nameToErrorMap.set("InvalidCloseTimestamp", InvalidCloseTimestampError);

/** ConfigAuthorityMismatch: Authority address does not match config authority */
export class ConfigAuthorityMismatchError extends ProgramError {
  override readonly name: string = "ConfigAuthorityMismatch";

  readonly code: number = 0xd; // 13

  constructor(program: Program, cause?: Error) {
    super("Authority address does not match config authority", program, cause);
  }
}
codeToErrorMap.set(0xd, ConfigAuthorityMismatchError);
nameToErrorMap.set("ConfigAuthorityMismatch", ConfigAuthorityMismatchError);

/** UserWalletMismatch: Wallet address does not match user wallet */
export class UserWalletMismatchError extends ProgramError {
  override readonly name: string = "UserWalletMismatch";

  readonly code: number = 0xe; // 14

  constructor(program: Program, cause?: Error) {
    super("Wallet address does not match user wallet", program, cause);
  }
}
codeToErrorMap.set(0xe, UserWalletMismatchError);
nameToErrorMap.set("UserWalletMismatch", UserWalletMismatchError);

/** MarketMintMismatch: Mint address does not match market mint */
export class MarketMintMismatchError extends ProgramError {
  override readonly name: string = "MarketMintMismatch";

  readonly code: number = 0xf; // 15

  constructor(program: Program, cause?: Error) {
    super("Mint address does not match market mint", program, cause);
  }
}
codeToErrorMap.set(0xf, MarketMintMismatchError);
nameToErrorMap.set("MarketMintMismatch", MarketMintMismatchError);

/** MarketResolverMismatch: Resolver address does not match market resolver */
export class MarketResolverMismatchError extends ProgramError {
  override readonly name: string = "MarketResolverMismatch";

  readonly code: number = 0x10; // 16

  constructor(program: Program, cause?: Error) {
    super("Resolver address does not match market resolver", program, cause);
  }
}
codeToErrorMap.set(0x10, MarketResolverMismatchError);
nameToErrorMap.set("MarketResolverMismatch", MarketResolverMismatchError);

/** MarketCreatorMismatch: Wallet address does not match market creator */
export class MarketCreatorMismatchError extends ProgramError {
  override readonly name: string = "MarketCreatorMismatch";

  readonly code: number = 0x11; // 17

  constructor(program: Program, cause?: Error) {
    super("Wallet address does not match market creator", program, cause);
  }
}
codeToErrorMap.set(0x11, MarketCreatorMismatchError);
nameToErrorMap.set("MarketCreatorMismatch", MarketCreatorMismatchError);

/** EntryWalletMismatch: Wallet address does not match position wallet */
export class EntryWalletMismatchError extends ProgramError {
  override readonly name: string = "EntryWalletMismatch";

  readonly code: number = 0x12; // 18

  constructor(program: Program, cause?: Error) {
    super("Wallet address does not match position wallet", program, cause);
  }
}
codeToErrorMap.set(0x12, EntryWalletMismatchError);
nameToErrorMap.set("EntryWalletMismatch", EntryWalletMismatchError);

/** OutcomeCountMismatch: Number of outcomes does not match the number of market events */
export class OutcomeCountMismatchError extends ProgramError {
  override readonly name: string = "OutcomeCountMismatch";

  readonly code: number = 0x13; // 19

  constructor(program: Program, cause?: Error) {
    super("Number of outcomes does not match the number of market events", program, cause);
  }
}
codeToErrorMap.set(0x13, OutcomeCountMismatchError);
nameToErrorMap.set("OutcomeCountMismatch", OutcomeCountMismatchError);

/** ResolveTooEarly: Market resolve timestamp has not been reached */
export class ResolveTooEarlyError extends ProgramError {
  override readonly name: string = "ResolveTooEarly";

  readonly code: number = 0x14; // 20

  constructor(program: Program, cause?: Error) {
    super("Market resolve timestamp has not been reached", program, cause);
  }
}
codeToErrorMap.set(0x14, ResolveTooEarlyError);
nameToErrorMap.set("ResolveTooEarly", ResolveTooEarlyError);

/** CloseTimestampInPast: Close timestamp is in the past */
export class CloseTimestampInPastError extends ProgramError {
  override readonly name: string = "CloseTimestampInPast";

  readonly code: number = 0x15; // 21

  constructor(program: Program, cause?: Error) {
    super("Close timestamp is in the past", program, cause);
  }
}
codeToErrorMap.set(0x15, CloseTimestampInPastError);
nameToErrorMap.set("CloseTimestampInPast", CloseTimestampInPastError);

/** ResolveTimestampBeforeClose: Resolve timestamp is before the close timestamp */
export class ResolveTimestampBeforeCloseError extends ProgramError {
  override readonly name: string = "ResolveTimestampBeforeClose";

  readonly code: number = 0x16; // 22

  constructor(program: Program, cause?: Error) {
    super("Resolve timestamp is before the close timestamp", program, cause);
  }
}
codeToErrorMap.set(0x16, ResolveTimestampBeforeCloseError);
nameToErrorMap.set("ResolveTimestampBeforeClose", ResolveTimestampBeforeCloseError);

/**
 * Attempts to resolve a custom program error from the provided error code.
 * @category Errors
 */
export function getHplParlayErrorFromCode(
  code: number,
  program: Program,
  cause?: Error,
): ProgramError | null {
  const constructor = codeToErrorMap.get(code);
  return constructor ? new constructor(program, cause) : null;
}

/**
 * Attempts to resolve a custom program error from the provided error name, i.e. 'Unauthorized'.
 * @category Errors
 */
export function getHplParlayErrorFromName(
  name: string,
  program: Program,
  cause?: Error,
): ProgramError | null {
  const constructor = nameToErrorMap.get(name);
  return constructor ? new constructor(program, cause) : null;
}
