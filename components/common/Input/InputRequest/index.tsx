import clsx from "clsx";
import { FC, InputHTMLAttributes, ReactNode } from "react";
import { useToggle } from "react-use";

import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  title?: string;
  description?: string;
  placeholder?: string;
  iconTitle?: ReactNode;
  value?: string;
  block?: boolean;
  width?: "md" | "lg" | "base" | "xl";
  inputClassName?: string;
  pattern?: "base" | "highlight";
  error?: ReactNode;
  iconLeft?: ReactNode;
}

const InputRequest: FC<IProps> = ({
  type,
  title,
  value,
  description,
  placeholder,
  iconTitle,
  block,
  width = "xl",
  inputClassName,
  className,
  pattern = "base",
  iconLeft,
  error,
  ...props
}) => {
  const [showPassword, toggleShowPassword] = useToggle(false);

  return (
    <div
      className={clsx("flex flex-col relative", { "w-full": block }, className)}
    >
      {title && (
        <div
          className={clsx(
            "font-semibold flex items-center text-[13px]",
            { "text-[#5B5F7B]": pattern === "base" },
            { "text-[#FF9533]": pattern === "highlight" },
            {
              "mb-2": !description,
            }
          )}
        >
          {iconTitle && <span className="mr-2">{iconTitle}</span>}
          <span>{title}</span>
          {iconLeft && <span className="text-base text-red-700">*</span>}:
        </div>
      )}
      {description && (
        <div
          className={clsx("flex justify-between items-center mb-2 mt-1", {
            "absolute top-0 right-0": !description,
          })}
        >
          {description && (
            <div className="flex-auto text-xs text-neutral-400">
              {description}
            </div>
          )}
        </div>
      )}
      <div className="relative">
        <input
          type={type === "password" && showPassword ? "text" : type}
          className={clsx(
            "rounded-full border bg-[#F7F7F7] text-[#A0A0A0] focus:outline-none px-2 py-1 h-[38px] placeholder-[#A0A0A0] ",
            { "pr-8": type === "password" },
            { "w-full": width === "xl" },
            { "w-[150px]": width === "lg" },
            { "w-[90px]": width === "base" },
            { "w-[60px]": width === "md" },
            { " text-center placeholder:pl-6": iconLeft },
            { "text-left ": !iconLeft },
            { "focus:border-black hover:border-black": !error },
            { "border-red-500": error },
            inputClassName
          )}
          placeholder={placeholder}
          value={value}
          {...props}
        />
        {iconLeft && (
          <div className="absolute inset-y-0 left-[10px] text-[#A0A0A0] flex items-center justify-center w-8 text-xl">
            {iconLeft}
          </div>
        )}
        {type === "password" && (
          <div className="absolute inset-y-0 right-0 flex items-center justify-center w-8">
            <button
              type="button"
              className="focus:outline-none text-neutral-500"
              onClick={toggleShowPassword}
            >
              {showPassword ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}
            </button>
          </div>
        )}
      </div>
      {!!error && <div className="mt-1 text-sm text-red-500">{error}</div>}
    </div>
  );
};

export default InputRequest;
