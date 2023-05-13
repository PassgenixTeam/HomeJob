import clsx from "clsx";
import { ButtonHTMLAttributes, FC, ReactNode } from "react";
import { ImSpinner2 } from "react-icons/im";

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  bold?: boolean;
  loading?: boolean;
  background?: "primary" | "black";
  className?: string;
  onClick?: () => void;
}

const ButtonIcon: FC<IProps> = ({
  icon,
  bold,
  disabled,
  background = "primary",
  loading,
  className,
  onClick,
  ...props
}) => {
  return (
    <button
      disabled={loading || disabled}
      onClick={onClick}
      className={clsx(
        { "bg-white rounded-full text-black hover:bg-[color:var(--primary-1)]": background === "primary" },
        { "bg-[#101010] rounded-lg": background === "black" },
        { "font-semibold": bold },
        "text-white  w-[30px] h-[30px] border-2 transition-all",
        className
      )}
      {...props}
    >
       <div className="mr-2 flex justify-center items-center text-[color:var(--primary-7)] w-full h-full">{icon}</div>
    </button>
  );
};

export default ButtonIcon;
