import HomeLayout from '@/components/layouts/homeLayout';
import ContractFreelance from '@/components/pageComponents/freelancer/contract';
import React, { ReactNode } from 'react';

export interface ContractPageProps {}

export default function ContractPage(props: ContractPageProps) {
  return <ContractFreelance />;
}

ContractPage.getLayout = (page: ReactNode) => {
  return <HomeLayout>{page}</HomeLayout>;
};
ContractPage.auth = {
  unauthorized: '/login',
};
