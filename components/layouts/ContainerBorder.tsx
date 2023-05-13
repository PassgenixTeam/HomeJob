import clsx from 'clsx';
import React from 'react';

interface ContainerBorderProps {
  children: React.ReactNode;
  className?: string;
}

const ContainerBorder = ({ children, className }: ContainerBorderProps) => {
  return <div className={clsx('w-full border py-6 px-8 rounded-2xl', className)}>{children}</div>;
};

export default ContainerBorder;
