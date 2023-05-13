import HomeLayout from '@/components/layouts/homeLayout';
import AllJob from '@/components/pageComponents/client/allJob';
import MyJob from '@/components/pageComponents/myJob';
import React, { ReactNode } from 'react';

export interface ClientMyJobsPageProps {}

export default function ClientMyJobsPage(props: ClientMyJobsPageProps) {
  return <AllJob />;
}

ClientMyJobsPage.getLayout = (page: ReactNode) => {
  return <HomeLayout>{page}</HomeLayout>;
};
ClientMyJobsPage.auth = {
  unauthorized: '/login',
};
