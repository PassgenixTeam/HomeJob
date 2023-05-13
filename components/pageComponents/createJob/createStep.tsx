import React, { ReactNode, forwardRef } from "react";
import { AiOutlinePlus } from "react-icons/ai";

export interface CreateStepProps {
  children: ReactNode;
  isOpen: boolean;
  title: string;
  onClick: () => void;
  step: number;
  total: number;
  subject: string;
}

export const CreateStep = forwardRef<HTMLDivElement,CreateStepProps>(
  function CreateStep({
    children,
    isOpen,
    title,
    onClick,
    step,
    total,
    subject
  },ref) {
    return (
      <div
        className={`my-2  border-y-[1px] ${
          isOpen
            ? "border-y-[color:var(--primary-9)] py-4"
            : "border-y-[color:var(--gray-7)] py-2"
        }  px-3`}
        ref={ref}
      >
        {!isOpen ? (
          <div
            className="flex justify-between items-center hover:cursor-pointer "
            onClick={() => onClick()}
          >
            <div className="flex items-center space-x-4">
              <AiOutlinePlus />
              <h2 className="text-lg font-semibold ">{subject}</h2>
            </div>
            <div>
              {step}/{total}
            </div>
          </div>
        ) : (
          <div className="">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-6 pt-4 pb-1">
                <div className="h-[10px] w-[10px] rounded-full overflow-hidden bg-[color:var(--primary-7)]"></div>
                <h1 className="text-3xl font-semibold text-[color:var(--primary-9)]">
                  {title}
                </h1>
              </div>
              <div className="text-[color:var(--primary-7)]">
                {step}/{total}
              </div>
            </div>
            {children}
          </div>
        )}
      </div>
    );
  }
) 