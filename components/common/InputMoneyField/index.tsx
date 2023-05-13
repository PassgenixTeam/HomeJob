import clsx from "clsx";
import { FC, FormEvent, InputHTMLAttributes, ReactNode, useEffect, useState } from "react";
import { useToggle } from "react-use";

import { BsCurrencyDollar, BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { FieldProps } from "formik";
import { TbAlertCircleFilled } from "react-icons/tb";

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
  arrayError?: boolean;
  hideMessage?: boolean;
}

const InputMoneyField: FC<IProps & FieldProps> = ({
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
  error,
  arrayError,
  hideMessage,
  onChange,
  ...props
}) => {
  const { name } = field;
  const { errors,values, touched,setFieldValue } = form;
  const [showError, setShowError] = useState<any>(()=>{
    if(name?.includes(".")){
      const nameList = name.split(".")
      if(errors[nameList[0]]&&touched[nameList[0]]){
        {/* @ts-ignore */}
        return (errors[nameList[0]][nameList[1]]) && (touched[nameList[0]][nameList[1]])
      }else{
        return false
      }
    }else{
      return errors[name] && touched[name]
    }
  } )

  const currencyFormat =(money:number)=>{
    return money.toFixed(2)
 }
 const handleChange = (e: FormEvent<HTMLInputElement>) => {
  if(onChange){
    onChange((e.target as any).value)
  }
  const money = currencyFormat(Number((e.target as any).value)) 
  setFieldValue(name,money);
  };

  useEffect(()=>{
    setShowError(()=>{
      if(name?.includes(".")){
      const nameList = name.split(".")
      if(errors[nameList[0]]&&touched[nameList[0]]){
        /* @ts-ignore */
        return (errors[nameList[0]][nameList[1]]) && (touched[nameList[0]][nameList[1]])
      }else{
        return false
      }
    }else{
      return errors[name] && touched[name]
    }
    })
  })
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
        <div className="absolute inset-y-0 left-1 flex items-center justify-center w-8">
          <BsCurrencyDollar/>
        </div>
        <input
          id={field.name}
          type="number"
          className={clsx(
            "rounded-md border text-[color:var(--text-color-black)] px-1 py-[5px] pl-6 placeholder-[#505470] text-end",
            { "pr-8": type === "password" },
            { "border-[color:var(--gray-5)] border-2": pattern === "base" },
            { "border-[#FF9533]": pattern === "highlight" },
            { "w-full": width === "xl" },
            { "w-[150px]": width === "lg" },
            { "w-[80px]": width === "base" },
            { "w-[52px]": width === "md" },
            { "hover:border-[color:var(--gray-7)]": !error },
            { "border-[color:var(--red-err)]": showError || arrayError },
            inputClassName
          )}
          placeholder={placeholder?placeholder:"0.00"}
          {...props}
          {...field}
          onBlur={(e)=>handleChange(e)}
        />
      </div>
      {showError && !hideMessage && (
        <div className="mt-1 text-sm text-red-500 font-medium flex items-center space-x-2">
        <TbAlertCircleFilled/>
        <span>
          {errors[name]?.toString()}
        </span>
        </div>
      )}
    </div>
  );
};

export default InputMoneyField;
