import type { ConfigV1, MarketV1, UserPositionV1, UserV1 } from "../src";
import type { RpcAccount } from "@metaplex-foundation/umi";

import { isPublicKey } from "@metaplex-foundation/umi";
import { bold } from "colorette";

import {
  AccountType,
  deserializeConfigV1,
  deserializeMarketV1,
  deserializeUserPositionV1,
  deserializeUserV1,
  getAccountTypeSerializer,
  getHplP2pProgramId,
} from "../src";

import { MAINNET_URL, createUmi, error } from "./_utils";

const args = process.argv.slice(2);

const address = args[0]?.trim();

if (address === undefined) {
  error("Missing account address argument");
} else if (!isPublicKey(address)) {
  error(`'${address}' is not a valid address`);
}

const rpcUrl = process.env.RPC_URL ?? MAINNET_URL;
const umi = createUmi(rpcUrl);

console.log(`${bold("Cluster:")} ${umi.rpc.getCluster()}`);
console.log(`${bold("Endpoint:")} ${umi.rpc.getEndpoint()}`);
console.log();

const account = await umi.rpc.getAccount(address);

if (!account.exists) {
  error(`Account [${address}] does not exist`);
}

const data = deserializeAccount(account);

console.log(bold(AccountType[data.accountType]));
console.dir(data, { colors: true, depth: null });

process.exit(0);

function deserializeAccount(
  account: RpcAccount,
): ConfigV1 | UserV1 | MarketV1 | UserPositionV1 {
  if (account.owner !== getHplP2pProgramId(umi)) {
    error(`Account [${account.publicKey}] is not owned by the P2P program`);
  }

  let accountType: AccountType;
  try {
    [accountType] = getAccountTypeSerializer().deserialize(account.data);
  } catch {
    const kind = account.data[0];
    if (kind === undefined) {
      accountType = AccountType.Uninitialized;
    } else {
      error(`Account [${account.publicKey}] has unknown type [0x${kind.toString(16)}]`);
    }
  }

  switch (accountType) {
    case AccountType.ConfigV1:
      return deserializeConfigV1(account);
    case AccountType.UserV1:
      return deserializeUserV1(account);
    case AccountType.MarketV1:
      return deserializeMarketV1(account);
    case AccountType.UserPositionV1:
      return deserializeUserPositionV1(account);

    case AccountType.Uninitialized:
      error("Account is uninitialized");
  }
}
