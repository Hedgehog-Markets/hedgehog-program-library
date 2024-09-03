import type { Amount, PublicKey } from "@metaplex-foundation/umi";

import { displayAmount, isPublicKey, isZeroAmount } from "@metaplex-foundation/umi";
import { base58 } from "@metaplex-foundation/umi/serializers";
import { bold } from "colorette";
import prompts from "prompts";

import { createConfigV1 } from "../src";

import { MAINNET_URL, createAmountFromDecimals, createUmi, decimalParts, error, walletKeypair } from "./_utils";

const rpcUrl = process.env.RPC_URL ?? MAINNET_URL;
const umi = createUmi(rpcUrl).use(walletKeypair());

console.log(`${bold("Cluster:")} ${umi.rpc.getCluster()}`);
console.log(`${bold("Endpoint:")} ${umi.rpc.getEndpoint()}`);

{
  const wallet = umi.identity.publicKey;
  const balance = await umi.rpc.getBalance(wallet);

  console.log();
  console.log(bold("Wallet"));
  console.log(`  ${bold("Address:")} ${wallet}`);
  console.log(`  ${bold("Balance:")} ${displayAmount(balance)}`);

  if (isZeroAmount(balance)) {
    console.log();
    console.log("Wallet balance is empty, are you using the correct wallet?");

    process.exit(1);
  }
}

//////////////////////////////////////////////////

interface ConfigArgs {
  authority?: PublicKey | undefined;
  platformFee?: Amount<"%", 2> | undefined;
}

console.log();

const config: ConfigArgs = await prompts([
  {
    type: "text",
    name: "authority",
    message: "Authority",
    initial: umi.identity.publicKey,

    format: (value: string) => (value === "" ? null : value),

    validate: (value: string) =>
      value === "" || isPublicKey(value) || "Invalid public key (leave blank to use default)",
  },
  {
    type: "text",
    name: "platformFee",
    message: "Platform fee (%)",
    initial: "0",

    format: (value: string) => (value === "" ? null : createAmountFromDecimals(value, "%", 2)),

    validate: (value: string) => {
      if (value === "") {
        return true;
      }

      const parts = decimalParts(value);
      if (parts === undefined) {
        return "Invalid fee (leave blank to use default)";
      }

      const [intPart, decPart] = parts;
      if (decPart !== undefined && decPart.length > 2) {
        return "Fee can only have 2 decimals";
      }

      let amount = Number(intPart) * 100;
      if (decPart !== undefined) {
        amount += Number(decPart.padEnd(2, "0"));
      }

      if (amount > 10_000) {
        return "Fee cannot exceed 100%";
      }

      return true;
    },
  },
]);
console.log();

if (config.authority === undefined || config.platformFee === undefined) {
  console.log("Cancelled.");

  process.exit(1);
}

console.log("Proceeding will create config with the following parameters.");
console.log();
console.log(`${bold("Authority:")} ${config.authority}`);
console.log(`${bold("Platform fee:")} ${displayAmount(config.platformFee)}`);
console.log();

interface ConfirmSend {
  send?: boolean | undefined;
}

const confirm: ConfirmSend = await prompts({
  type: "confirm",
  name: "send",
  message: "Send transaction?",
  initial: false,
});

if (confirm.send !== true) {
  console.log();
  console.log("Cancelled.");

  process.exit(1);
}

const builder = createConfigV1(umi, {
  authority: config.authority,
  platformFee: config.platformFee,
});

console.log();
console.log("Sending transaction...");

const { signature: signatureBytes, result } = await builder.sendAndConfirm(umi);

const [signature] = base58.deserialize(signatureBytes);

console.log();
console.log(`${bold("Signature:")} ${signature}`);

if (result.value.err !== null) {
  error(JSON.stringify(result.value.err));
}

process.exit(0);
