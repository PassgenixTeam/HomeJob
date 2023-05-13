import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

export interface SelectCustomProps {
  className?: string;
  option?: { value: string; label: string }[];
  value?: string;
  onChange?: (choice: { value: string; label: string }) => void;
  defaultValue?:string
}

export default function SelectCustom({
  className,
  option,
  value,
  onChange,
  defaultValue
}: SelectCustomProps) {
  const [show, setShow] = useState<boolean>(false);
  const [choice, setChoice] = useState<string>(value? value:defaultValue?defaultValue:"");
  const handleSelect = (choice: { value: string; label: string }) => {
    if (onChange) {
      onChange(choice);
    }
    setChoice(choice.label);
  };
  return (
    <div
      className={`h-fit rounded-lg border-[2px] border-[color:var(--gray-7)] relative
    px-2 ${className}`}
      onClick={() => setShow(!show)}
    >
      <div className="flex items-center justify-between">
        <p>{choice === "" ? "Select" : choice}</p>
        <FaChevronDown />
      </div>
      <div
        className={`absolute top-full left-0 shadow-md px-3 py-2 transition-all rounded-lg mt-1 bg-white min-w-full ${
          !show && "translate-y-[-120%] opacity-0 z-[-1]"
        }`}
      >
        {option?.map((item, index) => (
          <p
            key={index}
            onClick={() => handleSelect(item)}
            className="px-2 hover:cursor-pointer text-center"
          >
            {item.label}
          </p>
        ))}
      </div>
    </div>
  );
}
