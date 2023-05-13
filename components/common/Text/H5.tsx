import React from 'react';

interface H5Props {
  className?: string;
  children: React.ReactNode;
}

const H5 = ({ className, children }: H5Props) => {
  return <h5 className={`text-base font-semibold ${className}`}>{children}</h5>;
};

export default H5;
