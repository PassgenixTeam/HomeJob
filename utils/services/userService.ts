import { ILogin, ISocialLogin } from "@/interfaces";
import axios from "axios";
const url = process.env.NEXT_PUBLIC_BACKEND_URL;
export const UserService = {
  LOGIN:(data:ILogin)=>{
    return axios({
      method:"post",
      url:`${url}auth/login`,
      data:data
    })
  },
  LOGIN_SOCIAL:(data:ISocialLogin)=>{
    return axios({
      method:"post",
      url:`${url}auth/login-social`,
      data:data
    })
  },
};
