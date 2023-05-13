import { ACCESS_TOKEN } from '@/constants/storage';
import clsx from 'clsx';
import { FC, FormEvent, InputHTMLAttributes, ReactNode } from 'react';

import axios from 'axios';
import { FieldProps } from 'formik';
import { IconContext } from 'react-icons';
import { ImSpinner2 } from 'react-icons/im';
import { IoMdAttach } from 'react-icons/io';

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  title?: string;
  description?: string;
  placeholder?: string;
  iconTitle?: ReactNode;
  value?: string;
  block?: boolean;
  width?: 'md' | 'lg' | 'base' | 'xl';
  inputClassName?: string;
  pattern?: 'base' | 'highlight';
  error?: ReactNode;
  loading?: boolean;
  arrayError?: boolean;
  hideMessage?: boolean;
  onChange?: (fileInfo: any) => void;
}
const url = process.env.NEXT_PUBLIC_BACKEND_URL;

const InputFileField: FC<IProps & FieldProps> = ({
  field,
  form,
  type,
  title,
  value,
  description,
  placeholder,
  iconTitle,
  block,
  width = 'xl',
  inputClassName,
  className,
  pattern = 'base',
  error,
  arrayError,
  hideMessage,
  onChange,
  loading,
  ...props
}) => {
  const { name } = field;
  const { values, errors, touched, setFieldValue } = form;
  const showError = errors[name] && touched[name];
  const handleChange = async (e: FormEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange((e.target as any).files);
    }
    const formData = new FormData();
    //@ts-ignore
    for (const file of (e.target as any).files) {
      formData.append('files', file);
    }
    const fileLink = await axios({
      method: 'post',
      url: `${url}files`,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
      },
      onDownloadProgress: function (progressEvent) {
        console.log(progressEvent.event.srcElement.getResponseHeader('content-length'));
      },
    })
      .then((res) => res.data)
      .catch((error) => console.log(error));
    console.log(fileLink?.data);
    setFieldValue(
      name,
      fileLink?.data.map((item: any) => item.url)
    );

    // setFieldValue(name, (e.target as any).files || null);
  };
  return (
    <div className={clsx('flex flex-col relative', { 'w-full': block }, className)}>
      {title && (
        <div
          className={clsx(
            'font-bold flex items-center text-[13px]',
            { 'text-[color:var(--text-color-black)]': pattern === 'base' },
            { 'text-[#FF9533]': pattern === 'highlight' },
            {
              'mb-[6px]': !description,
            }
          )}
        >
          {iconTitle && <span className="mr-2">{iconTitle}</span>}
          <span>{title}</span>
        </div>
      )}
      <div className="relative">
        <label
          htmlFor={field.name}
          className="flex relative space-x-2 py-1 px-3 rounded-full w-fit items-center font-semibold hover:cursor-pointer
          border-2 border-[color:var(--primary-6)] text-[color:var(--primary-6)] z-10 bg-white"
        >
          <div className="animate-spin">
            {loading && (
              <IconContext.Provider
                value={{
                  color: '#e5e5e5',
                }}
              >
                <div>
                  <ImSpinner2 size={20} />
                </div>
              </IconContext.Provider>
            )}
          </div>
          <IoMdAttach />
          <p>Tệp đính kèm</p>
        </label>
        <div className="w-full h-fit relative left-0 top-0 overflow-hidden z-[-1]">
          <input
            id={field.name}
            type="file"
            multiple
            className={clsx(
              'relative text-[color:var(--text-color-black)] border-0 font-semibold hidden',
              { 'border-[#FF9533]': pattern === 'highlight' },
              { 'w-full': width === 'xl' },
              { 'w-[150px]': width === 'lg' },
              { 'w-[80px]': width === 'base' },
              { 'w-[52px]': width === 'md' },
              { 'hover:border-[color:var(--gray-7)]': !error },
              { 'border-[color:var(--red-err)]': showError || arrayError },
              inputClassName
            )}
            placeholder={placeholder}
            {...props}
            // {...field}
            //@ts-ignore
            onChange={(e) => handleChange(e)}
          />
        </div>
      </div>
      {showError && !hideMessage && <div className="mt-1 text-sm text-red-500">{errors[name]?.toString()}</div>}
    </div>
  );
};

export default InputFileField;
