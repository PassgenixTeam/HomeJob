import React, { ReactNode } from 'react';
import HomeLayout from '../../../components/layouts/homeLayout';
import AllJob from '@/components/pageComponents/client/allJob';

const AllJobPage = () => <AllJob />;

export default AllJobPage;

AllJobPage.getLayout = (page: ReactNode) => {
  return <HomeLayout>{page}</HomeLayout>;
};
AllJobPage.auth = {
  unauthorized: '/login',
};
