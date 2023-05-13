import HomeLayout from '@/components/layouts/homeLayout';
import Contract from '@/components/pageComponents/contract';
import { ReactNode } from 'react';

export interface ContractDetailPageProps {}

export default function ContractDetailPage(props: ContractDetailPageProps) {
  return <Contract />;
}

ContractDetailPage.getLayout = (page: ReactNode) => {
  return <HomeLayout>{page}</HomeLayout>;
};
ContractDetailPage.auth = {
  unauthorized: '/login',
};
