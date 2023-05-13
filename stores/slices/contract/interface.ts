import { IJobRespond } from '@/stores/slices/jobs/interface';
import { IUserProfile } from '@/stores/slices/profile/interface';

export interface IContractRequest {
  jobId: string;
  contractorId: string;
  information: any;
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
  information: {
    commitClient?: string;
    commitContractor?: string;
  };
}
