import React,{ReactNode} from 'react';
import HomeHeader from '../homeLayout/header';
import HomeFooter from '../homeLayout/footer';
import PaymentNavBar from './paymentSideBar';

export interface  PaymentLayoutProps {
  children:ReactNode
}

export default function PaymentLayout ({children}:  PaymentLayoutProps) {
  return (
    <div className='h-[1500px] w-full'>
      <HomeHeader/>
      <div className='h-fit w-full mt-[80px] flex justify-center py-10'>
        <div className='w-full max-w-[1050px] '>
          <h6 className='text-3xl py-5'>Billing</h6>
          <div className='space-x-6 w-full'>
            <PaymentNavBar/>
            <div className='grow'>
              <h6 className='text-2xl mt-6 font-medium pb-8 w-full text-center'>Payments Information</h6>
              <div className='border rounded-lg w-full'>
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
      <HomeFooter/>
    </div>
  );
}
