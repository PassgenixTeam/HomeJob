import HomeLayout from '@/components/layouts/homeLayout';
import Proposal from '@/components/pageComponents/client/proposals';
import React, { ReactNode } from 'react';

const ProposalPage = () => {
  return <Proposal />;
};

export default ProposalPage;

ProposalPage.getLayout = (page: ReactNode) => {
  return <HomeLayout>{page}</HomeLayout>;
};
ProposalPage.auth = {
  unauthorized: '/login',
};
