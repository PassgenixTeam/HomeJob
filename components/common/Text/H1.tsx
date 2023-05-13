import React from 'react';

interface H1Props {
  className?: string;
  children: React.ReactNode;
}

const H1 = ({ className, children }: H1Props) => {
  return <h1 className={`text-4xl font-semibold ${className}`}>{children}</h1>;
};

export default H1;
