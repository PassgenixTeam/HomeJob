import { ILogin, IRegister } from "@/interfaces";
import { axiosRequest } from "@/utils/axiosRequest";
import axios from "axios";

const url = process.env.NEXT_PUBLIC_BACKEND_URL;
const factories = {
  requestLogin:(data:ILogin)=>{
    return axios({
      method:"post",
      url:`${url}auth/login`,
      data:data
    })
  },
  requestRegister:(data:IRegister)=>{
    return axiosRequest({
      method:"post",
      url:`auth/register`,
      data:data
    })
  },
  getProfile:()=>{
    return axiosRequest({
      method:"get",
      url:`user/profile`,
    })
  },
  requestSignOut:()=>{
    return axiosRequest({
      method:"get",
      url:`auth/logout`,
    })
  },
  requestAccessToken:(data:string)=>{
    return axios({
      method:"get",
      url:`${url}auth/refresh-token`,
      headers:{
        refresh:data
      }
    })
  },
  requestSelectRole:(data:{role:string})=>{
    return axiosRequest({
      method:"patch",
      url:`user/role`,
      data:data
    })
  },
}
export default factories;