import clsx from 'clsx';
import React, { TextareaHTMLAttributes } from 'react';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
}

const TextArea = ({ value, onChange, className, ...props }: TextAreaProps) => {
  return (
    <textarea
      value={value}
      onChange={onChange}
      {...props}
      className={clsx(
        'block p-2.5 w-full text-sm rounded-lg border border-[color:var(--primary-2)] focus:border-[color:var(--primary-4)] hover:border-[color:var(--primary-4)] h-[200px]',
        className
      )}
    />
  );
};

export default TextArea;
