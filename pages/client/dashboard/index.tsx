import HomeLayout from '@/components/layouts/homeLayout';
import ClientDashboard from '@/components/pageComponents/client/dashboard';
import React, { ReactNode } from 'react';

export interface ClientDashboardPageProps {}

export default function ClientDashboardPage(props: ClientDashboardPageProps) {
  return <ClientDashboard />;
}

ClientDashboardPage.getLayout = (page: ReactNode) => {
  return <HomeLayout>{page}</HomeLayout>;
};
ClientDashboardPage.auth = {
  unauthorized: '/login',
};
