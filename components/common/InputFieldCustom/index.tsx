import clsx from "clsx";
import { FC, InputHTMLAttributes, ReactNode } from "react";
import { useToggle } from "react-use";

import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { FieldProps } from "formik";

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
  iconRight?: ReactNode;
  arrayError?: boolean;
  hideMessage?: boolean;
}

const InputCustomField: FC<IProps & FieldProps> = ({
  field,
  form,
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
  iconRight,
  error,
  arrayError,
  hideMessage,
  ...props
}) => {
  const [showPassword, toggleShowPassword] = useToggle(false);
  const { name } = field;
  const { errors, touched } = form;
  const showError = errors[name] && touched[name];

  return (
    <div
      className={clsx("flex flex-col relative", { "w-full": block }, className)}
    >
      {title && (
        <div
          className={clsx(
            "font-bold flex items-center text-[13px]",
            { "text-[color:var(--text-color-black)]": pattern === "base" },
            { "text-[#FF9533]": pattern === "highlight" },
            {
              "mb-[6px]": !description,
            }
          )}
        >
          {iconTitle && <span className="mr-2">{iconTitle}</span>}
          <span>{title}</span>
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
          id={field.name}
          type={type === "password" && showPassword ? "text" : type}
          className={clsx(
            "rounded-md border text-[color:var(--text-color-black)] focus:outline-offset-4 focus:outline-2 focus:outline-[color:var(--primary-7)] focus:bg-[color:var(--primary-1)] px-1 py-[5px] placeholder-[#505470]",
            { "pr-8": type === "password" },
            { "border-[color:var(--gray-7)]": pattern === "base" },
            { "border-[#FF9533]": pattern === "highlight" },
            { "w-full": width === "xl" },
            { "w-[150px]": width === "lg" },
            { "w-[80px]": width === "base" },
            { "w-[52px]": width === "md" },
            {
              "focus:border-[color:var(--gray-7)] hover:border-[color:var(--gray-7)]":
                !error,
            },
            { "border-[color:var(--red-err)]": showError || arrayError },
            inputClassName
          )}
          placeholder={placeholder}
          {...props}
          {...field}
        />
        {iconRight && (
          <div className="absolute inset-y-0 right-0 flex items-center justify-center w-8">
            {iconRight}
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
      {showError && !hideMessage && (
        <div className="mt-1 text-sm text-red-500">
          {errors[name]?.toString()}
        </div>
      )}
    </div>
  );
};

export default InputCustomField;
