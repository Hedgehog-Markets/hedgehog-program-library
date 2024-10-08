import type { Context, Pda, PublicKey } from "@metaplex-foundation/umi";

import { publicKey, string } from "@metaplex-foundation/umi/serializers";

import { getHplParlayProgramId } from "../generated/programs/hplParlay";

export function findDepositPda(
  context: Pick<Context, "eddsa" | "programs">,
  seeds: {
    /** The address of the market. */
    market: PublicKey;
  },
): Pda {
  const programId = getHplParlayProgramId(context);
  return context.eddsa.findPda(programId, [
    string({ size: "variable" }).serialize("deposit"),
    publicKey().serialize(seeds.market),
  ]);
}

export function findPlatformFeesPda(
  context: Pick<Context, "eddsa" | "programs">,
  seeds: {
    /** The address of the mint. */
    mint: PublicKey;
  },
): Pda {
  const programId = getHplParlayProgramId(context);
  return context.eddsa.findPda(programId, [
    string({ size: "variable" }).serialize("platform_fees"),
    publicKey().serialize(seeds.mint),
  ]);
}

export function findCreatorFeesPda(
  context: Pick<Context, "eddsa" | "programs">,
  seeds: {
    /** The address of the wallet. */
    wallet: PublicKey;
    /** The address of the mint. */
    mint: PublicKey;
  },
): Pda {
  const programId = getHplParlayProgramId(context);
  return context.eddsa.findPda(programId, [
    string({ size: "variable" }).serialize("creator_fees"),
    publicKey().serialize(seeds.wallet),
    publicKey().serialize(seeds.mint),
  ]);
}
