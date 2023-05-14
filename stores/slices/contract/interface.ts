import { IJobRespond } from "@/stores/slices/jobs/interface";
import { IUserProfile } from "@/stores/slices/profile/interface";
import { IProposalDetail } from "@/stores/slices/proposal/interface";

export interface IContractRequest {
  jobId: string;
  contractorId: string;
  information: any;
  txHash: string;
  approvedTxHash?: string;
  oraiJobId: string;
}

export interface IContractResponse {
  job: IJobRespond;
  contractor: IUserProfile;
  owner: IUserProfile;
  status: string;
  createdAt: string;
  updatedAt: string;
  id: string;
  jobId: string;
  contractorId: string;
  ownerId: string;
  oraiJobId: string;
  txHash: string;
  approvedTxHash?: string;
  information: {
    commitClient?: string;
    commitContractor?: string;
  };
  proposal: IProposalDetail;
}
