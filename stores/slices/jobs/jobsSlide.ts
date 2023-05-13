import { AppState } from '@/stores/store';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { IFileResponse, IJobRespond, IJobsRequest, ISkills, JobState } from './interface';
import { toast } from 'react-toastify';
import { useAppSelector } from '@/stores/hooks';

const initialState: JobState = {
  isLoading: false,
  error: '',
  info: {},
  fileUrl: [],
  skillList: [],
  jobDetail: {
    id: '',
    title: '',
    description: '',
    jobType: null,
    budget: 0,
    hourlyTo: 0,
    hourlyFrom: 0,
    attachments: [],
    skills: [],
    estimate: 0,
  },
  jobs: [],
};

export const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    getFileLink: (state, action: PayloadAction<FormData>) => {
      state.isLoading = true;
    },
    getFileLinkSuccess: (state, action: PayloadAction<IFileResponse[]>) => {
      state.isLoading = false;
      state.error = '';
      state.fileUrl = action.payload;
    },
    getFileLinkFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    postJobs: (state, action: PayloadAction<IJobsRequest>) => {
      state.isLoading = true;
    },
    postJobsSuccess: (state, action: PayloadAction<IFileResponse[]>) => {
      state.isLoading = false;
      state.error = '';
      state.info = action.payload;
      toast.success('Create Job Success!');
    },
    postJobsFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    getSkillList: (state, action: PayloadAction) => {
      state.isLoading = true;
    },
    getSkillListSuccess: (state, action: PayloadAction<ISkills[]>) => {
      state.isLoading = false;
      state.error = '';
      state.skillList = action.payload;
    },
    getSkillListFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    getJobDetail: (state, action: PayloadAction<string>) => {
      state.isLoading = true;
    },
    getJobDetailSuccess: (state, action: PayloadAction<IJobRespond>) => {
      state.isLoading = false;
      state.error = '';
      state.jobDetail = action.payload;
    },
    getJobDetailFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    getJobs: (state, action: PayloadAction) => {
      state.isLoading = true;
    },
    getJobsSuccess: (state, action: PayloadAction<IJobRespond[]>) => {
      state.isLoading = false;
      state.error = '';
      state.jobs = action.payload;
    },
    getJobsFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getFileLink,
  getFileLinkSuccess,
  getFileLinkFailure,
  postJobs,
  postJobsSuccess,
  postJobsFailure,
  getSkillList,
  getSkillListSuccess,
  getSkillListFailure,
  getJobDetail,
  getJobDetailSuccess,
  getJobDetailFailure,
  getJobs,
  getJobsFailure,
  getJobsSuccess,
} = jobsSlice.actions;

// Other code such as selectors can use the imported `AppState` type
export const selectIsLoading = (state: AppState) => state.jobs.isLoading;
export const selectError = (state: AppState) => state.jobs.error;
export const selectInfo = (state: AppState) => state.jobs.info;
export const selectJobs = () => useAppSelector((state: AppState) => state.jobs.jobs);

export default jobsSlice.reducer;
