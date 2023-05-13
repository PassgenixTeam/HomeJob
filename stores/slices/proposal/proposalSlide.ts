import { AppState } from '@/stores/store';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { IProposalDetail, ProposalState } from './interface';
import { toast } from 'react-toastify';
import { IApplyJobForm } from '@/interfaces';

const initialState: ProposalState = {
  isLoading: false,
  error: '',
  info: {},
  detail: null,
  proposals: [],
};

export const proposalSlice = createSlice({
  name: 'proposal',
  initialState,
  reducers: {
    submitProposal: (state, action: PayloadAction<IApplyJobForm>) => {
      state.isLoading = true;
    },
    submitProposalSuccess: (state, action: PayloadAction<IProposalDetail>) => {
      state.isLoading = false;
      state.error = '';
      state.detail = action.payload;
      toast.success('Submit Proposal Success!');
    },
    submitProposalFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
      toast.error('Submit Proposal Fail!');
      toast.error(action.payload);
    },
    getProposal: (state, action: PayloadAction<string>) => {
      state.isLoading = true;
    },
    getProposalSuccess: (state, action: PayloadAction<IProposalDetail>) => {
      state.isLoading = false;
      state.error = '';
      state.detail = action.payload;
    },
    getProposalFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    getAllProposalByJob: (state, action: PayloadAction<string>) => {
      state.isLoading = true;
    },
    getAllProposalByJobSuccess: (state, action: PayloadAction<IProposalDetail[]>) => {
      state.isLoading = false;
      state.error = '';
      state.proposals = action.payload;
    },
    getAllProposalByJobFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  submitProposal,
  submitProposalSuccess,
  submitProposalFailure,
  getProposal,
  getProposalSuccess,
  getProposalFailure,
  getAllProposalByJob,
  getAllProposalByJobFailure,
  getAllProposalByJobSuccess,
} = proposalSlice.actions;

// Other code such as selectors can use the imported `AppState` type
export const selectIsLoading = (state: AppState) => state.proposal.isLoading;
export const selectError = (state: AppState) => state.proposal.error;
export const selectInfo = (state: AppState) => state.proposal.info;
export const selectDetail = (state: AppState) => state.proposal.detail;
export const selectProposals = (state: AppState) => state.proposal.proposals;

export default proposalSlice.reducer;
