import HomeLayout from '@/components/layouts/homeLayout';
import ProposalJob from '@/components/pageComponents/proposal/job';
import React,{ReactNode} from 'react';
import { GetServerSideProps } from "next";
import { wrapper } from '@/stores/store';

export interface  ProposalJobPageProps {
}

export default function ProposalJobPage (props:  ProposalJobPageProps) {
  return (
    <ProposalJob/>
  );
}

ProposalJobPage.getLayout = (page: ReactNode) => {
  return <HomeLayout>{page}</HomeLayout>;
};
ProposalJobPage.auth = {
  unauthorized: "/login",
}