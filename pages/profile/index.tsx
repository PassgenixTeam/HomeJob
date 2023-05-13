import HomeLayout from '@/components/layouts/homeLayout';
import Profile from '@/components/pageComponents/profile';
import React,{ReactNode} from 'react';

export interface  ProfilePageProps {
}

export default function ProfilePage (props:  ProfilePageProps) {
  return (
    <Profile/>
  );
}
ProfilePage.getLayout = (page: ReactNode) => {
  return <HomeLayout>{page}</HomeLayout>;
};
ProfilePage.auth = {
  unauthorized: "/login",
}