import React from 'react';

interface TextMutedProps {
  className?: string;
  children: React.ReactNode;
}

const TextMuted = ({ className, children }: TextMutedProps) => {
  return <p className={`text-sm font-normal text-[color:var(--text-muted)] ${className}`}>{children}</p>;
};

export default TextMuted;
