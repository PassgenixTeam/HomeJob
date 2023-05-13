import clsx from "clsx";
import { FC, ReactNode, TextareaHTMLAttributes } from "react";

import { FieldProps } from "formik";
import { TbAlertCircleFilled } from "react-icons/tb";

interface IProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  title?: string;
  description?: string;
  placeholder?: string;
  iconTitle?: ReactNode;
  value?: string;
  block?: boolean;
  width?: "md" | "lg" | "base" | "xl";
  inputClassName?: string;
  pattern?: "base" | "highlight";
  error?: string;
  iconRight?: ReactNode;
}

const TextareaField: FC<IProps&FieldProps> = ({
  field,
  form,
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
  ...props
}) => {
  const { name } = field;
  const { errors, touched } = form;
  const showError = touched[name]&&errors[name]

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
        <textarea
          id={field.name}
          className={clsx(
            "rounded-md border  text-[#505470] focus:outline-none px-1 py-[5px] placeholder-[#505470]",
            { "border-[#505470]": pattern === "base" },
            { "border-[#FF9533]": pattern === "highlight" },
            { "w-full": width === "xl" },
            { "w-[150px]": width === "lg" },
            { "w-[80px]": width === "base" },
            { "w-[52px]": width === "md" },
            { "focus:border-black hover:border-black": !showError },
            { "border-red-500": showError },
            inputClassName,
            
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
      </div>
      {showError&& <div className="mt-1 text-sm text-red-500 font-medium flex items-center space-x-2">
        <TbAlertCircleFilled/>
        <span>{errors[name]?.toString()}</span>
        </div>}
    </div>
  );
};

export default TextareaField;
