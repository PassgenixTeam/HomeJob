import SelectRole from '@/components/pageComponents/selectRole';
import * as React from 'react';

export interface  SelectRolePageProps {
}

export default function SelectRolePage (props:  SelectRolePageProps) {
  return (
    <SelectRole/>
  );
}
SelectRolePage.auth = {
  unauthorized: "/login",
}