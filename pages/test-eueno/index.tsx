import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import { BufferData, UploadType, UploadUrl, createProject, login } from "@eueno/lib-browser";
import React from "react";
import { toast } from "react-toastify";
import { uploadFile as uploadFileLibrary } from "@eueno/lib-browser";

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
  const [token, setToken] = React.useState("");
  const [file, setFile] = React.useState<File>();

  const onLogin = async () => {
    try {
      const account = "0x935164e0917e859496564316aa3d7ebbabd4f4e9";
      const response = await login(account);
      setToken(response?.data?.data.token);
      console.log(response?.data?.data.token);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = async () => {
    const data = { name: "Huhu" };
    const response = await createProject(data, token);
    if (response?.status == 200) {
      console.log(response);
      toast.success("Project created!");
    } else {
      toast.error(response || "An error occurred, please try again later");
    }
  };

  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFile(e.target.files![0]);
  };

  console.log(file);
  const uploadFile = async () => {
    debugger;

    await uploadFileLibrary(
      "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIweDkzNTE2NGUwOTE3ZTg1OTQ5NjU2NDMxNmFhM2Q3ZWJiYWJkNGY0ZTkiLCJtZW1vIjoiMzUzMTU5NDE0NDk0MDAzMiIsImV4cCI6MTY4NDExNjI3NCwiaWF0IjoxNjg0MDI5ODc0fQ.DklegsrZdBSgk3aHlkePyhv6VWdjv7wjlucLeXoqE7tGZ2D_CVYVKo0yUKVVp32FzGJNIJQ_plsVCXtJLu_7Dg",
      "123123123123123",
      {
        // exportedKey: ,
        projectId: "300",
        file: file!,
        path: ["300"],
        uploadType: "UNENCRYPTED",
        inFolder: false,
        account: "orai1u8m0gp8vqccvs5mdqnf5a8q499k9hqwdsjyal3",
        onUploadProgress: () => {
          console.log("hahahahha");
        },
      }
    );
  };

  return (
    <div className="w-full h-screen flex justify-center items-center flex-col gap-12">
      <Button title="Login" onClick={onLogin} />
      <Button title="Taoj project" onClick={handleClick} />
      <Input type="file" onChange={handleFileSelected} />
      <Button title="uploadfile" onClick={uploadFile} />
    </div>
  );
};

export default TestEueno;
