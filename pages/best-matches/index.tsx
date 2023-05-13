import HomeLayout from '@/components/layouts/homeLayout';
import BestMatch from '@/components/pageComponents/bestMatch';
import React, { ReactNode } from 'react';

const BestMatchPage = () => {
  return <BestMatch />;
};

export default BestMatchPage;

BestMatchPage.getLayout = (page: ReactNode) => {
  return <HomeLayout>{page}</HomeLayout>;
};
BestMatchPage.auth = {
  unauthorized: '/login',
};
