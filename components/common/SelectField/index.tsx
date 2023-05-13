import clsx from "clsx";
import { FC, useId } from "react";
import ReactSelect, { Props, components } from "react-select";
import { VscCheck } from "react-icons/vsc";
import { FieldProps } from "formik";

interface IProps extends Props {
  title?: string;
  isGroup?: boolean;
  placeholder?: string;
  className?: string;
  error?: string;
  circle?: boolean;
  modal?: boolean;
  borderSolid?:boolean;
  onChange?:(e:any)=>void;
  disabled?: boolean;
  height?:string;
  inputClassName?:string;
  hideError?:boolean;
  isMulti?:boolean
}

const SelectField: FC<IProps&FieldProps> = ({
  field,
  form,
  title,
  isGroup,
  placeholder = "",
  className = "",
  error,
  circle,
  modal = false,
  borderSolid,
  onChange,
  disabled,
  height,
  inputClassName,
  hideError,
  isMulti,
  ...props
}) => {
  const handleChange = (e:any)=>{
    
    if(isMulti){
      form.setFieldValue(field.name,e)
      if(onChange){
        onChange(e)
      }
    }else{
      if(onChange){
        onChange(e.value)
      }
      form.setFieldValue(field.name,e.value)
    }
  }
  return (
    <div className={`w-full ${className}`}>
      {title && (
        <div className="text-[13px] text-[color:var(--text-color-black)] mb-2 font-bold">
          {title}
        </div>
      )}
      <ReactSelect
        id={field.name}
        instanceId={useId()}
        className={`${inputClassName} absolute top-0 left-0 w-[100%] basic-single `}
        classNamePrefix="select"
        menuPlacement="auto"
        isDisabled={disabled}
        components={{
          GroupHeading: (props) => (
            <components.GroupHeading
              {...props}
              style={{ color: "black", fontWeight: "bold" }}
            />
          ),
          Option: (props) => (
            <div
              {...props.innerProps}
              className="flex items-center justify-between px-4 py-1 cursor-pointer hover:bg-neutral-200"
            >
              <span className={clsx({ "text-sm pl-2": isGroup })}>
                {/* @ts-ignore */}
                {props.data.label}
              </span>
              {props.isSelected && <VscCheck />}
            </div>
          ),
        }}
        styles={{
          control: (base, state) => ({
            ...base,
            textTransform: 'capitalize',
            boxShadow: "none",
            borderColor: error
              ? "rgb(239 68 68)"
              : state.isFocused
              ? "black"
              : modal?borderSolid?"#575C76":
               "#E4E6EE"
              : "#575C76",
            "&:hover": {
              borderColor: error
                ? "rgb(239 68 68)"
                : modal?borderSolid?"#575C76":
                 "#E4E6EE"
                : "black",
            },
            paddingLeft: circle ? "8px" : "0px",
            minHeight: modal ? "32px" : "27px",
            height:height?height:"29px",
            paddingRight: circle ? "8px" : "0px",
            borderRadius: circle ? "100px" : "4px",
            backgroundColor: circle ? " #F7F7F7" : "translate",
            whiteSpace:"nowrap"
          }),
          dropdownIndicator: (base) => ({
            ...base,
            padding: circle ? "4px 4px 4px 0px" : "8px",
          }),
        }}
        placeholder={placeholder}
        isMulti={isMulti}
        {...props}
        {...field}
        onChange={(e)=>handleChange(e)}

      />
      {(!!error && !hideError) && <div className="mt-1 text-sm text-red-500">{error}</div>}
    </div>
  );
};

export default SelectField;
