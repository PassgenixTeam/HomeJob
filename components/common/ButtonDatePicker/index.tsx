// import IconCalendar from "components/common/icons/Calendar";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  value?: string;
  onClick?: () => void;
  placeholder?:string
}

const ButtonDatePicker = forwardRef<HTMLButtonElement, IProps>(
  ({ title, className, onClick = () => {},placeholder, value, ...props }, ref) => {
    return (
      <div>
        <p className="font-bold text-[13px] mb-2">{title}</p>
        <button
          ref={ref}
          onClick={onClick}
          className={`text-[#171717] text-xs font-semibold py-[8px] px-5 border-[1px] 
          border-solid border-[#E5E5E5] rounded-lg bg-white flex justify-between items-center w-full h-[40px] ${className}`}
          {...props}
        >
          <div className="text-xs font-semibold text-[#171717]">{value?value:placeholder}</div>
          {/* <div ><IconCalendar color="#A0A0A0"/></div> */}
        </button>
      </div>
    );
  }
);
ButtonDatePicker.displayName = "ButtonDatePicker";
export default ButtonDatePicker;
