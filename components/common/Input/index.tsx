import clsx from 'clsx';
import { FC, InputHTMLAttributes, ReactNode } from 'react';
import { useToggle } from 'react-use';

import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  title?: string;
  description?: string;
  placeholder?: string;
  iconTitle?: ReactNode;
  value?: string;
  block?: boolean;
  width?: 'md' | 'lg' | 'base' | 'xl';
  inputClassName?: string;
  pattern?: 'base' | 'highlight' | 'modal';
  flight?: boolean;
  error?: ReactNode;
  iconRight?: ReactNode;
  square?: boolean;
}

const Input: FC<IProps> = ({
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
  iconRight,
  flight = false,
  error,
  square,
  ...props
}) => {
  const [showPassword, toggleShowPassword] = useToggle(false);

  return (
    <div className={clsx('flex flex-col relative', { 'w-full': block }, className)}>
      {title && (
        <div
          className={clsx(
            'font-semibold flex items-center text-[13px]',
            { 'text-[#5B5F7B]': pattern === 'base' },
            { 'text-[#FF9533]': pattern === 'highlight' },
            { 'text-[#5B5F7B]': pattern === 'modal' },
            {
              'mb-2': !description,
            },
            {
              'mb-4': !description && !square,
              'font-semibold ': !square,
              'mb-1': square,
            }
          )}
        >
          {iconTitle && <span className="mr-2">{iconTitle}</span>}
          <span>{title}</span>
        </div>
      )}
      {description && (
        <div
          className={clsx('flex justify-between items-center mb-2 mt-1', {
            'absolute top-0 right-0': !description,
          })}
        >
          {description && <div className="flex-auto text-xs text-neutral-400">{description}</div>}
        </div>
      )}
      <div className="relative">
        <input
          type={type === 'password' && showPassword ? 'text' : type}
          className={clsx(
            ' border  text-[#505470] focus:outline-none px-1 placeholder-[#505470]',
            { 'pr-8': type === 'password' },
            { 'border-[color:var(--primary-2)]': pattern === 'base' },
            { 'border-[#FF9533]': pattern === 'highlight' },
            { 'border-[#E4E6EE] focus:border-[#575C76]': pattern === 'modal' },
            { 'py-[5px]': flight === false },
            { 'py-[4px]': flight === true },
            { 'w-full': width === 'xl' },
            { 'w-[150px]': width === 'lg' },
            { 'w-[80px]': width === 'base' },
            { 'rounded-[100px]': iconRight },
            { 'rounded-[4px]': !iconRight },
            { 'w-[52px]': width === 'md' },
            { 'focus:border-[color:var(--primary-4)] hover:border-[color:var(--primary-4)]': !error },
            { 'border-red-500': error },
            { 'rounded-lg px-2 py-[6px]': !square },
            inputClassName
          )}
          placeholder={placeholder}
          value={value}
          {...props}
        />
        {iconRight && <div className="absolute inset-y-0 right-0 flex items-center justify-center w-8">{iconRight}</div>}
        {type === 'password' && (
          <div className="absolute inset-y-0 right-0 flex items-center justify-center w-8">
            <button type="button" className="focus:outline-none text-neutral-500" onClick={toggleShowPassword}>
              {showPassword ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}
            </button>
          </div>
        )}
      </div>
      {!!error && <div className="mt-1 text-sm text-red-500">{error}</div>}
    </div>
  );
};

export default Input;
