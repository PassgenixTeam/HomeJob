import clsx from "clsx";
import { FieldProps } from "formik";
import { FC, InputHTMLAttributes, ReactNode, useRef } from "react";
import { AiFillCheckSquare, AiOutlineCheck, AiOutlineCheckSquare } from "react-icons/ai";
import { BsCheckSquareFill, BsSquare } from "react-icons/bs";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  label: ReactNode;
  align?: "top" | "center";
  block?: boolean;
  error?: boolean;
  className?: string;
  onClick?: () => void;
  description?: boolean;
  custom?: boolean;
  square?:boolean
}

const RadioField: FC<IProps & FieldProps> = ({
  field,
  form,
  label,
  align = "center",
  block,
  error,
  checked,
  className,
  value,
  onClick,
  description,
  custom,
  square,
  ...props
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleChange = () => {
    inputRef.current?.click();
    if (onClick) {
      onClick();
    } else {
      form.setFieldValue(field.name, value);
    }
  };
  return (
    <div
      className={clsx("cursor-pointer my-3", { "w-fit": !block }, className)}
      onClick={() => handleChange()}
    >
      <div className={clsx("flex", { "items-center": align === "center" })}>
        <input type="radio" hidden {...props} ref={inputRef} {...field} />
        <div
          className={clsx(
            "w-8 flex-shrink-0 text-xl",
            { "mt-1": align === "top" },
            { "text-red-500": error }
          )}
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
        <div>
          <div className="text-base font-semibold">{label}</div>
          {description && (
            <div className="inline text-sm leading-4">{description}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RadioField;
