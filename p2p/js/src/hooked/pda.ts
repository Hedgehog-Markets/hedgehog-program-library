import type { Context, Pda, PublicKey } from "@metaplex-foundation/umi";

import { publicKey, string } from "@metaplex-foundation/umi/serializers";

import { getHplP2pProgramId } from "../generated/programs/hplP2p";

export function findDepositPda(
  context: Pick<Context, "eddsa" | "programs">,
  seeds: {
    /** The address of the market. */
    market: PublicKey;
  },
): Pda {
  const programId = getHplP2pProgramId(context);
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
  const programId = getHplP2pProgramId(context);
  return context.eddsa.findPda(programId, [
    string({ size: "variable" }).serialize("platform_fees"),
    publicKey().serialize(seeds.mint),
  ]);
}
