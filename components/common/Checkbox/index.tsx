import clsx from "clsx";
import { FC, InputHTMLAttributes, ReactElement, ReactNode, useRef } from "react";

import { BsSquare } from "react-icons/bs";
import { AiOutlineCheck } from "react-icons/ai";


interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  label: ReactNode;
  align?: "top" | "center";
  block?: boolean;
  error?: boolean;
  className?: string;
  labelClass?:string;
  custormCheckBox?:ReactElement
}

const Checkbox: FC<IProps> = ({
  label,
  align = "center",
  block,
  checked,
  error,
  className,
  labelClass,
  custormCheckBox,
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
      <input type="Checkbox" hidden {...props} ref={inputRef} />
      <div className={clsx("w-8 flex-shrink-0", { "mt-1": align === "top" })}>
        {checked ?(custormCheckBox?custormCheckBox: <AiOutlineCheck /> ): <BsSquare />}
      </div>
      <div className={`text-sm ${labelClass}`}>{label}</div>
    </div>
  );
};

export default Checkbox;
