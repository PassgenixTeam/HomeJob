import React,{ReactNode} from 'react';

export interface  PaymentLayoutProps {
  children:ReactNode
}

export default function PaymentLayout ({children}:  PaymentLayoutProps) {
  return (
    <div>
      Header
      {children}
    </div>
  );
}
