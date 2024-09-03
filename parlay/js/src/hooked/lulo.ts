import type { ClusterFilter, Context, Pda, PublicKey } from "@metaplex-foundation/umi";

import { publicKey, string } from "@metaplex-foundation/umi/serializers";

export const LULO_PROGRAM_ID =
  "FL3X2pRsQ9zHENpZSKDRREtccwJuei8yg9fwDu9UN69Q" as PublicKey<"FL3X2pRsQ9zHENpZSKDRREtccwJuei8yg9fwDu9UN69Q">;

export function getLuloProgramId(
  context: Pick<Context, "programs">,
  clusterFilter?: ClusterFilter,
): PublicKey {
  return context.programs.getPublicKey("lulo", LULO_PROGRAM_ID, clusterFilter);
}

export function findLuloUserPda(
  context: Pick<Context, "eddsa" | "programs">,
  seeds: {
    /** The address of the owner. */
    owner: PublicKey;
  },
): Pda {
  const programId = getLuloProgramId(context);
  return context.eddsa.findPda(programId, [
    string({ size: "variable" }).serialize("flexlend"),
    publicKey().serialize(seeds.owner),
  ]);
}
