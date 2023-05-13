import React from 'react';

interface TextNormalProps {
  className?: string;
  children: React.ReactNode;
}

const TextNormal = ({ className = '', children }: TextNormalProps) => {
  return <span className={`text-sm font-normal text-[color:var(--text-normal)] leading-5 ${className}`}>{children}</span>;
};

export default TextNormal;
