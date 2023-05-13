import React from 'react';

interface H6Props {
  className?: string;
  children: React.ReactNode;
}

const H6 = ({ className, children }: H6Props) => {
  return <h6 className={`text-sm font-semibold ${className}`}>{children}</h6>;
};

export default H6;
