import PaymentLayout from '@/components/layouts/paymentLayout';
import React,{ReactNode} from 'react';

export interface  BillPageProps {
}

export default function BillPage (props:  BillPageProps) {
  return (
    <div>
      Bill
    </div>
  );
}

BillPage.getLayout = (page:ReactNode)=>{
  return <PaymentLayout>{page}</PaymentLayout>
}
BillPage.auth = {
  unauthorized:"/login"
}