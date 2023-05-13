import HomeLayout from '@/components/layouts/homeLayout';
import ContractClient from '@/components/pageComponents/client/contract';
import React, { ReactNode } from 'react';

export interface ContractPageProps {}

export default function ContractPage(props: ContractPageProps) {
  return <ContractClient />;
}

ContractPage.getLayout = (page: ReactNode) => {
  return <HomeLayout>{page}</HomeLayout>;
};
ContractPage.auth = {
  unauthorized: '/login',
};
