import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
}

const Container = ({ children }: ContainerProps) => {
  return <div className="container mx-auto px-4 py-8 space-y-8">{children}</div>;
};

export default Container;
