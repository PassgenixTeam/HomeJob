import clsx from 'clsx';
import _ from 'lodash';
import { FC, InputHTMLAttributes, ReactNode } from 'react';
import Skeleton from 'react-loading-skeleton';

import { IoMdRadioButtonOff } from 'react-icons/io';
import Radio from '@/components/common/Radio';
import TextMuted from '@/components/common/Text/TextMuted';

// @ts-ignore
interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  title?: string;
  iconTitle?: ReactNode;
  options: Array<{
    label: ReactNode;
    value: string;
    textMuted?: string;
  }>;
  error?: string;
  loading?: boolean;
  blue?: boolean;
  className?: string;
  isRow?: boolean;
  square?: boolean;
}

const MultiRadio: FC<IProps> = ({
  title,
  iconTitle,
  options,
  name,
  value,
  error,
  blue = false,
  loading,
  className,
  isRow = false,
  square,
  ...props
}) => {
  return (
    <div className={clsx('flex  flex-col', className)}>
      {title && (
        <div className="text-[#5B5F7B] flex items-center mb-2 font-semibold text-[13px]">
          {iconTitle && <span className="mr-2">{iconTitle}</span>}
          <span>{title}</span>
        </div>
      )}
      <div className={clsx('relative flex gap-4', { 'flex-col': isRow === false }, { 'flex-row flex-wrap': isRow === true })}>
        {loading
          ? _.range(3).map((item) => (
              <div key={item} className="flex items-center">
                <div className="text-xl ">
                  <IoMdRadioButtonOff />
                </div>
                <div className="text-xl">
                  <Skeleton />
                </div>
              </div>
            ))
          : options.map((item, index) => (
              <>
                <Radio
                  square
                  key={index}
                  label={item.label}
                  name={name}
                  value={item.value}
                  error={!!error}
                  blue={blue}
                  checked={value === item.value}
                  {...props}
                />

                {item.textMuted && <TextMuted className="mt-[-10px] text-xs">{item.textMuted}</TextMuted>}
              </>
            ))}
      </div>
      {!!error && <div className="mt-1 text-sm text-red-500">{error}</div>}
    </div>
  );
};

export default MultiRadio;
