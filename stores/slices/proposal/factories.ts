import { ACCESS_TOKEN } from '@/constants/storage';
import { IApplyJobForm } from '@/interfaces';
import { axiosRequest } from '@/utils/axiosRequest';
import axios from 'axios';
// import { IFile } from "./interface";

const url = process.env.NEXT_PUBLIC_BACKEND_URL;
const factories = {
  submitProposal: (proposal: IApplyJobForm) => {
    return axiosRequest({
      method: 'post',
      url: `proposal`,
      data: proposal,
    });
  },
  getProposal: (id: string) => {
    return axiosRequest({
      method: 'get',
      url: `proposal/${id}`,
    });
  },
  getTopBidding: (id: string) => {
    return axiosRequest({
      method: 'get',
      url: `proposal/top-bidding/job/${id}`,
    });
  },
  getAllProposalByJob: (id: string) => {
    return axiosRequest({
      method: 'get',
      url: `proposal/job/${id}`,
    });
  },
};
export default factories;
