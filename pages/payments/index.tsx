import PaymentLayout from '@/components/layouts/paymentLayout';
import PaymentMethod from '@/components/pageComponents/payments/paymentMethod';
import React,{ReactNode} from 'react';

export interface  PaymentPageProps {
}

export default function PaymentPage (props:  PaymentPageProps) {
  return (
    <PaymentMethod/>
  );
}

PaymentPage.getLayout = (page:ReactNode)=>{
  return <PaymentLayout>{page}</PaymentLayout>
}
PaymentPage.auth = {
  unauthorized:"/login"
}