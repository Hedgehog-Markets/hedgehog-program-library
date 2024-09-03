import type { UmiPlugin } from "@metaplex-foundation/umi";

import { createHplP2pProgram } from "./generated";

export const hplP2p = (): UmiPlugin => ({
  install(umi) {
    umi.programs.add(createHplP2pProgram(), false);
  },
});
