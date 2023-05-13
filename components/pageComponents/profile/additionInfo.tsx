import ButtonIcon from "@/components/common/ButtonIcon";
import React, { ReactNode } from "react";
import { BsPlus } from "react-icons/bs";

export interface AdditionalInfoProps {
  children: ReactNode;
  title: string;
  subTitle?: string;
}

export default function AdditionalInfo({
  children,
  title,
  subTitle,
}: AdditionalInfoProps) {
  return (
    <div className="px-8 py-6 rounded-2xl w-full h-fit border space-y-6">
      <div className="flex justify-between">
        <div>
          <h6 className="text-2xl font-semibold">{title}</h6>
          {subTitle && <p>{subTitle}</p>}
        </div>
        <ButtonIcon icon={<BsPlus size={26} />} />
      </div>
      <div>
        {children}
      </div>
    </div>
  );
}
