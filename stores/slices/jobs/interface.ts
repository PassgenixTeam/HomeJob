import { ROLE } from '@/constants';
import { EXPERIENCE_LEVEL, IModify, JOB_STATUS, PROJECT_LENGTH, SCOPE_TYPE } from '@/interfaces';

export interface JobState {
  info: any;
  isLoading: boolean;
  error: string;
  fileUrl: IFileResponse[];
  skillList: ISkills[];
  jobDetail: IJobRespond;
  jobs: IJobRespond[];
}
export interface IFileResponse {
  url: string;
  size: number;
  type: string;
}
export interface IJobsRequest {
  title: string;
  description: string;
  scopeType?: SCOPE_TYPE;
  experienceLevel?: EXPERIENCE_LEVEL;
  projectLength?: PROJECT_LENGTH;
  estimate: number;
  budget: number;
  hourlyTo?: number;
  hourlyFrom?: number;
  attachments: string[];
  status?: JOB_STATUS;
  skills?: string[];
}
export interface ISkills {
  name: string;
  id: string;
  skill: { id: string; name: string };
}
export interface IJobRespond extends IModify {
  id: string;
  title: string;
  description: string;
  jobType?: 'fixed' | 'hourly' | null;
  scopeType?: SCOPE_TYPE;
  experienceLevel?: EXPERIENCE_LEVEL;
  projectLength?: PROJECT_LENGTH;
  budget: number;
  hourlyTo: number;
  hourlyFrom: number;
  attachments: {
    url: string;
    size: number;
  }[];
  status?: JOB_STATUS;
  skills: { id: string; name: string }[];
  estimate: number;
  proposalCount?: string;
}
