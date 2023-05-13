import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";

export const getSigningClient = async () => {
  await window.owallet?.enable(process.env.NEXT_PUBLIC_CHAIN_ID!);
  const signer = await window.owallet?.getOfflineSignerAuto(process.env.NEXT_PUBLIC_CHAIN_ID!);
  const signingClient = await SigningCosmWasmClient.connectWithSigner(process.env.NEXT_PUBLIC_CHAIN_RPC!, signer!);

  return {
    signer,
    signingClient,
  };
};
