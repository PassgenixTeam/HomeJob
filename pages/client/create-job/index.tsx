import HomeLayout from '@/components/layouts/homeLayout';
import CreateJob from '@/components/pageComponents/createJob';
import React,{ReactNode} from 'react';
import { useSession } from "next-auth/react";
export interface  CreateJobPageProps {
}

export default function CreateJobPage (props:  CreateJobPageProps) {
  const session = useSession()
  return (
    <CreateJob/>
  );
}

CreateJobPage.getLayout = (page: ReactNode) => {
  return <HomeLayout>{page}</HomeLayout>;
};

CreateJobPage.auth = {
  unauthorized: "/login",
}