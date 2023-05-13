import Button from '@/components/common/Button';
import { createProject, login } from '@eueno/lib-browser';
import React from 'react';
import { toast } from 'react-toastify';

const TestEueno = () => {
  const [token, setToken] = React.useState('');

  const onLogin = async () => {
    try {
      const account = '0x935164e0917e859496564316aa3d7ebbabd4f4e9';
      const response = await login(account);
      setToken(response?.data?.data.token);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = async () => {
    const data = { name: 'Thang' };
    const response = await createProject(data, token);
    if (response?.status == 200) {
      console.log(response);
      toast.success('Project created!');
    } else {
      toast.error(response || 'An error occurred, please try again later');
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center flex-col gap-12">
      <Button title="Login" onClick={onLogin} />
      <Button title="Taoj project" onClick={handleClick} />
    </div>
  );
};

export default TestEueno;
