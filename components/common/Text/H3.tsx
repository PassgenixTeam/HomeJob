import React from 'react';

interface H3Props {
  className?: string;
  children: React.ReactNode;
}

const H3 = ({ className, children }: H3Props) => {
  return <h3 className={`text-xl font-medium ${className}`}>{children}</h3>;
};

export default H3;
