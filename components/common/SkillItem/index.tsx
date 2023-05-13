import React, { ReactNode } from 'react';

export interface SkillItemProps {
  children: ReactNode;
  className?: string;
}

export default function SkillItem({ children, className }: SkillItemProps) {
  return (
    <div
      className={`rounded-full px-4 py-1 bg-[color:var(--primary-2)] 
    hover:cursor-pointer hover:bg-[color:var(--primary-3)] w-fit text-sm ${className}`}
    >
      {children}
    </div>
  );
}
