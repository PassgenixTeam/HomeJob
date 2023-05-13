import Link from "next/link";
import React, { ReactNode } from "react";

interface TextLinkProps {
  className?: string;
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  icon?: ReactNode;
}

const TextLink = ({
  className = "",
  children,
  href,
  onClick,
  icon,
}: TextLinkProps) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  if (href)
    return (
      <Link
        href={href}
        className={`text-sm font-semibold text-[color:var(--primary-8)] hover:underline hover:text-[color:var(--primary-6)] ${className}`}
      >
        {children}
      </Link>
    );
  return (
    <div
      className={`text-base flex items-center font-semibold w-fit text-[color:var(--primary-8)] 
       hover:cursor-pointer hover:text-[color:var(--primary-6)] hover:underline ${className}`}
      onClick={() => handleClick()}
    >
      {icon}
      {children}
    </div>
  );
};

export default TextLink;
