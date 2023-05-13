import HomeLayout from '@/components/layouts/homeLayout';
import MyJob from '@/components/pageComponents/myJob';
import React,{ReactNode} from 'react';

export interface  ClientMyJobsPageProps {
}

export default function ClientMyJobsPage (props:  ClientMyJobsPageProps) {
  return (
    <MyJob />
  );
}

ClientMyJobsPage.getLayout = (page: ReactNode) => {
  return <HomeLayout>{page}</HomeLayout>;
};
ClientMyJobsPage.auth = {
  unauthorized: '/login',
};
