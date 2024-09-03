import type { UmiPlugin } from "@metaplex-foundation/umi";

import { createHplParlayProgram } from "./generated";

export const hplParlay = (): UmiPlugin => ({
  install(umi) {
    umi.programs.add(createHplParlayProgram(), false);
  },
});
