import { ACCESS_TOKEN } from "@/constants/storage";
import { axiosRequest } from "@/utils/axiosRequest";
import axios from "axios";
import { IConfirmPayment, ICreateInternPayment } from "./interface";
// import { IFile } from "./interface";

const url = process.env.NEXT_PUBLIC_BACKEND_URL;
const factories = {
  getPayments:(customerId:string)=>{
    return axiosRequest({
      method:"get",
      url:`stripe/customer/${customerId}/payment-methods`
    })
  },
  payAction:(paymentInfo:ICreateInternPayment)=>{
    return axiosRequest({
      method: "post",
      url: `stripe/create-payment-intent`,
      data:paymentInfo
    })
  },
  confirmPayment: (paymentInfo:IConfirmPayment)=>{
    return axiosRequest({
      method: "post",
      url: `stripe/confirm-payment-intent`,
      data:paymentInfo
    })
  }
}
export default factories;