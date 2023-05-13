import HomeLayout from '@/components/layouts/homeLayout';
import FreelancerDashboard from '@/components/pageComponents/freelancer/dashboard';
import React,{ReactNode} from 'react';

export interface  FreelancerDashboardPageProps {
}

export default function FreelancerDashboardPage (props:  FreelancerDashboardPageProps) {
  return (
    <FreelancerDashboard/>
  );
}

FreelancerDashboardPage.getLayout = (page: ReactNode) => {
  return <HomeLayout>{page}</HomeLayout>;
};
FreelancerDashboardPage.auth = {
  unauthorized: '/login',
};

