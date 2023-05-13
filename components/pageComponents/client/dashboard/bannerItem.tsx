import React, { ReactNode } from "react";
import { GrClose } from "react-icons/gr";
import { IoCloseOutline, IoCloseSharp } from "react-icons/io5";

export interface BannerItemProps {
  children: ReactNode;
  title: string;
  close?: boolean;
  variant?: "fill" | "outline";
}

export default function BannerItem({
  children,
  title,
  close,
  variant = "outline",
}: BannerItemProps) {
  return (
    <div
      className={`rounded-2xl p-6 h-[360px] w-[352px] ${
        variant === "outline" ? "bg-white" : "bg-[color:var(--primary-7)] text-white"
      } border hover:cursor-pointer`}
    >
      <div className="flex justify-between items-center">
        <p className="text-lg font-medium">{title}</p>
        {close&&
        <div className={`hover:cursor-pointer ${variant === "outline" ? "text-black" : " text-white"}`}>
          <IoCloseOutline size={30}/>
        </div>
        }
      </div>
      {children}
    </div>
  );
}
