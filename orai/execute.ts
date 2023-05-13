import { oraiGetSigningClient } from "./helper";

export const oraiCreateJob = async (jobData: CreateJobData): Promise<string> => {
  const { signingClient, signer } = await oraiGetSigningClient();
  const { address: signerAddress } = (await signer!.getAccounts())[0];
  const executeRes = await signingClient.execute(
    signerAddress,
    process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!,
    {
      create_new_job: jobData,
    },
    "auto"
  );
  return executeRes.transactionHash;
};

export const oraiAcceptJob = async (jobId: string): Promise<string> => {
  const { signingClient, signer } = await oraiGetSigningClient();
  const { address: signerAddress } = (await signer!.getAccounts())[0];
  const executeRes = await signingClient.execute(
    signerAddress,
    process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!,
    {
      accept_job: {
        job_id: jobId,
      },
    },
    "auto"
  );
  return executeRes.transactionHash;
};
