import type { UmiPlugin } from "@metaplex-foundation/umi";

import { createHhAmmProgram } from "./generated";

export const hhAmm = (): UmiPlugin => ({
  install(umi) {
    umi.programs.add(createHhAmmProgram(), false);
  },
});
