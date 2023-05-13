import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { Decimal } from "@cosmjs/math";

export const oraiGetSigningClient = async () => {
  await window.owallet?.enable(process.env.NEXT_PUBLIC_CHAIN_ID!);
  const signer = await window.owallet?.getOfflineSignerAuto(process.env.NEXT_PUBLIC_CHAIN_ID!);
  const signingClient = await SigningCosmWasmClient.connectWithSigner(process.env.NEXT_PUBLIC_CHAIN_RPC!, signer!, {
    gasPrice: {
      amount: Decimal.fromUserInput(process.env.NEXT_PUBLIC_CHAIN_GAS_PRICE!, Number(process.env.NEXT_PUBLIC_CHAIN_FRACTIONAL_DIGITS!)),
      denom: process.env.NEXT_PUBLIC_CHAIN_DENOM!,
    },
  });

  return {
    signer,
    signingClient,
  };
};
