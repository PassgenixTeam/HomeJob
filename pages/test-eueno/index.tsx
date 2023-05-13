import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { BufferData, UploadType, UploadUrl, createProject, login } from '@eueno/lib-browser';
import React from 'react';
import { toast } from 'react-toastify';
import { uploadFile as uploadFileLibrary } from '@eueno/lib-browser';

interface UploadOptions {
  file: File;
  path: string[]; // Path file
  projectId: string;
  uploadType: UploadType;
  inFolder: boolean;
  exportedKey?: string; // Need if encrypt
  onUploadProgress: () => void; // Progress upload file,
  account: string;
}

export interface UploadFileOptions extends UploadOptions {
  uploadUrl?: UploadUrl; // must be ignored when upload single file
  callback?: (bufferData: BufferData, webseed: string[], account: string) => void; // callback must be ignored when upload single file
}

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

  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>): void => {
    // const files = Array.from(e.target.files);
    // console.log('files:', files);
  };

  const uploadFile = async () => {
    const file = new File([''], 'test.txt', { type: 'text/plain' });

    await uploadFileLibrary(
      token,
      '042db023b4b09e8780ef09c4d6d4afbfa541b60d87fc828b949245f46edee11b15ae8a83e2a07dfcdee6303c800b669d0e266c996f13ef05cd24af8704f6934314',
      {
        // exportedKey: ,
        file: file,
        path: ['112'],
        projectId: '112',
        uploadType: 'ENCRYPT',
        inFolder: false,
        account: 'orai1u8m0gp8vqccvs5mdqnf5a8q499k9hqwdsjyal3',
        onUploadProgress: () => {
          console.log('hahahahha');
        },
      }
    );
  };

  return (
    <div className="w-full h-screen flex justify-center items-center flex-col gap-12">
      <Button title="Login" onClick={onLogin} />
      <Button title="Taoj project" onClick={handleClick} />
      <Input type="file" onChange={handleFileSelected} />
      <Button title="uploadfile" onClick={handleClick} />
    </div>
  );
};

export default TestEueno;
