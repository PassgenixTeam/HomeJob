import { IApplyJobForm, IModify } from '@/interfaces';
import { IJobRespond } from '@/stores/slices/jobs/interface';

export interface ProposalState {
  info: any;
  isLoading: boolean;
  error: string;
  detail: IProposalDetail | null;
  proposals: IProposalDetail[];
}
export interface IProposalDetail extends IApplyJobForm, IModify {
  id: string;
  job: IJobRespond;
}
