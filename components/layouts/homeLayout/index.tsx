import * as React from 'react';
import HomeHeader from './header';
import HomeFooter from './footer';

export interface  HomeLayoutProps {
  children:React.ReactNode
}

export default function HomeLayout ({children}:  HomeLayoutProps) {
  return (
    <div className='w-full'>
      <HomeHeader/>
      <div className='h-fit w-full mt-[80px]'>
        {children}
      </div>
      <HomeFooter/>
    </div>
  );
}
