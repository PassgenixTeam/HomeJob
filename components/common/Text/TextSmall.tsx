import React from 'react';

interface TextSmallProps {
  className?: string;
  children: React.ReactNode;
}

const TextSmall = ({ className = '', children }: TextSmallProps) => {
  return <span className={`text-xs font-normal text-[color:var(--text-normal)] leading-4 ${className}`}>{children}</span>;
};

export default TextSmall;
