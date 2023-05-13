import HomeLayout from '@/components/layouts/homeLayout';
import MyJob from '@/components/pageComponents/freelancer/myJob';
import React, { ReactNode } from 'react';

const MyJobPage = () => <MyJob />;

export default MyJobPage;

MyJobPage.getLayout = (page: ReactNode) => {
  return <HomeLayout>{page}</HomeLayout>;
};
MyJobPage.auth = {
  unauthorized: '/login',
};
