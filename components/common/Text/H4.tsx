import React from 'react';

interface H4Props {
  className?: string;
  children: React.ReactNode;
}

const H4 = ({ className, children }: H4Props) => {
  return <h4 className={`text-lg font-semibold ${className}`}>{children}</h4>;
};

export default H4;
