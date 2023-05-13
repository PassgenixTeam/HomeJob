import HomeLayout from '@/components/layouts/homeLayout';
import JobProposalDetail from '@/components/pageComponents/client/prosalDetail';
import React,{ReactNode} from 'react';

export interface  JobProposalDetailPageProps {
}

export default function JobProposalDetailPage (props:  JobProposalDetailPageProps) {
  return (
    <JobProposalDetail/>
  );
}

JobProposalDetailPage.getLayout = (page: ReactNode) => {
  return <HomeLayout>{page}</HomeLayout>;
};
JobProposalDetailPage.auth = {
  unauthorized: '/login',
};
