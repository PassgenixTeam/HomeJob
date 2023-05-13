import { IApplyJobForm, IModify } from "@/interfaces";

export interface ProposalState {
  info: any;
  isLoading: boolean;
  error: string;
  detail: IProposalDetail | null;
  proposals: IProposalDetail[];
}
export interface IProposalDetail extends IApplyJobForm, IModify {
  id: string;
}
