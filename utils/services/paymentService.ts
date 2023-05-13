import axios from "axios"
const url = process.env.NEXT_PUBLIC_BACKEND_URL;
export const createPaypalOrder= (payload:{amount:number})=>{
  return axios({
    method: "post",
    url: `${url}paypal/create-order`,
    data:payload
  })
}
export const captureOrder= (payload:{orderId:string})=>{
  return axios({
    method: "post",
    url: `${url}paypal/capture-order`,
    data:payload
  })
}
export const createPaymentByTokenRequest = (data:any) => {
  return axios({
    method: "post",
    url: `${url}stripe/create-payment-method`,
    data:data
  });
};
