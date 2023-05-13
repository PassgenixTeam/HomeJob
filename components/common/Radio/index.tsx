import clsx from "clsx";
import { FC, InputHTMLAttributes, ReactNode, useRef } from "react";
import { AiOutlineCheck, AiOutlineCheckSquare } from "react-icons/ai";
import { BsCheckSquareFill, BsSquare } from "react-icons/bs";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  label: ReactNode;
  align?: "top" | "center";
  block?: boolean;
  error?: boolean;
  blue?: boolean;
  custom?:boolean;
  className?: string;
  square?:boolean
}

const Radio: FC<IProps> = ({
  label,
  align = "center",
  block,
  error,
  checked,
  blue = false,
  className,
  custom,
  square,
  ...props
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div
      className={clsx(
        "flex cursor-pointer",
        { "items-center": align === "center" },
        { "w-fit": !block },
        { "text-red-500": error },
        className
      )}
      onClick={() => inputRef.current?.click()}
    >
      <input type="radio" hidden {...props} ref={inputRef} />
      <div
        className={clsx("w-8 flex-shrink-0 text-xl", {
          "mt-1": align === "top",
        })}
      >
        {
            square?
            <div className="text-[color:var(--primary-7)]">
              {
                checked?
                <BsCheckSquareFill/>:
                <BsSquare/>
              }
            </div>
            :<div
            className={`w-[15px] h-[15px] rounded-full outline  outline-2 ${
              custom
                ? checked
                  ? "outline-[color:var(--primary-7)] outline-[5px] bg-[color:var(--primary-7)] w-[5px] h-[5px] m-[3.5px]"
                  : "outline-[color:var(--gray-6)]"
                : "outline-[color:var(--primary-9)]"
            } 
             outline-offset-2 p-1 ${
               checked && !custom && "bg-[color:var(--primary-9)]"
             } `}
          ></div>
          }
      </div>
      <div className="text-sm">{label}</div>
    </div>
  );
};

export default Radio;
