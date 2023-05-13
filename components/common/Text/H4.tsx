import React from 'react';

interface H4Props {
  className?: string;
  children: React.ReactNode;
  title?: string;
}

const H4 = ({ className, children, title, ...props }: H4Props) => {
  return (
    <h4 title={title} className={`text-lg font-semibold ${className}`} {...props}>
      {children}
    </h4>
  );
};

export default H4;
