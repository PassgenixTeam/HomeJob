import HomeLayout from '@/components/layouts/homeLayout';
import React, { ReactNode } from 'react';
import { useSession } from 'next-auth/react';
import CreateContract from '@/components/pageComponents/create-contract';
export interface CreateContractPageProps {}

export default function CreateContractPage(props: CreateContractPageProps) {
  const session = useSession();
  return <CreateContract />;
}

CreateContractPage.getLayout = (page: ReactNode) => {
  return <HomeLayout>{page}</HomeLayout>;
};

CreateContractPage.auth = {
  unauthorized: '/login',
};
