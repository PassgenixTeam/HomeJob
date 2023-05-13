// import { axiosRequest } from "../axiosRequest"

import { ACCESS_TOKEN } from "@/constants/storage";
import axios from "axios"
const url = process.env.NEXT_PUBLIC_BACKEND_URL;
const options = {}
export const JobService = {
  getJobById:(jobId:string)=>{
    return axios({
      method:"get",
      url:`${url}job/${jobId}`
    })
  },
  getLink:(files:FormData)=>{
    return axios({
      method:"post",
      url:`${url}files`,
      data:files,
      headers:{
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`
      },
      responseType:"blob",
      onDownloadProgress:function(progressEvent) {
          console.log(progressEvent)
      },
    }).then(res=>res.data)
  },
}