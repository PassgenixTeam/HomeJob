import { ACCESS_TOKEN } from '@/constants/storage';
import { axiosRequest } from '@/utils/axiosRequest';
import axios from 'axios';
import { IJobsRequest } from './interface';
// import { IFile } from "./interface";

const url = process.env.NEXT_PUBLIC_BACKEND_URL;
const factories = {
  getFileLink: (files: FormData) => {
    return axios({
      method: 'post',
      url: `${url}files`,
      data: files,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
      },
    });
  },
  postJobs: (jobInfo: IJobsRequest) => {
    return axiosRequest({
      method: 'post',
      url: `job`,
      data: jobInfo,
    });
  },
  getSkills: () => {
    return axiosRequest({
      method: 'get',
      url: `sub-skill`,
    });
  },
  getJobDetail: (id: string) => {
    return axiosRequest({
      method: 'get',
      url: `job/${id}`,
    });
  },
  getJobs: (filer: string) => {
    return axiosRequest({
      method: 'get',
      url: `job`,
    });
  },
  getMyJobs: () => {
    return axiosRequest({
      method: 'get',
      url: `job/my-jobs`,
    });
  },
};
export default factories;
