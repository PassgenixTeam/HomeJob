import React, { ReactNode, useState } from "react";
import { FaChevronDown } from "react-icons/fa";

export interface DropdownItemProps {
  title: string;
  children: ReactNode;
}

export default function DropdownItem({ title, children }: DropdownItemProps) {
  const [hasShow, setHasShow] = useState<boolean>(true);
  return (
    <div className="w-full border-b-[1px] py-3">
      <div
        className={`flex justify-between items-center w-full ${hasShow&&"pb-3"} hover:cursor-pointer`}
        onClick={() => setHasShow(!hasShow)}
      >
        <p className="font-medium">{title}</p>
        <div className={`${hasShow && "rotate-180"} transition-all text-[color:var(--primary-7)]`}>
          <FaChevronDown size={18}/>
        </div>
      </div>
      <div className={` ${hasShow?"h-fit ":"h-[0px] overflow-hidden"} transition-all`}>
        {children}
      </div>
    </div>
  );
}
