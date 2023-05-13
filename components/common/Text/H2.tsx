import React from 'react';

interface H2Props {
  className?: string;
  children: React.ReactNode;
}

const H2 = ({ className, children }: H2Props) => {
  return <h2 className={`text-2xl font-medium ${className}`}>{children}</h2>;
};

export default H2;
