import clsx from "clsx";
import { ButtonHTMLAttributes, FC, ReactNode } from "react";
import { ImSpinner2 } from "react-icons/im";

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  icon?: ReactNode;
  variant?:
    | "fill"
    | "outline"
    | "transparent"
    | "border"
    | "outlinetransparent";
  size?: "sm" | "md" | "lg";
  block?: boolean;
  bold?: boolean;
  underline?: string;
  loading?: boolean;
  className?: string;
  onClick?: () => void;
}

const Button: FC<IProps> = ({
  title,
  icon,
  variant = "fill",
  size = "md",
  block,
  bold,
  underline,
  disabled,
  loading,
  className,
  onClick = () => {},
  ...props
}) => {
  return (
    <button
      disabled={loading || disabled}
      onClick={onClick}
      className={clsx(
        {
          "text-white disabled:bg-neutral-500 disabled:border-neutral-500 bg-[color:var(--primary-7)] border-2 border-[color:var(--primary-7)] rounded-[15px] hover:bg-[color:var(--primary-6)] hover:border-[color:var(--primary-6)]":
            variant === "fill",
        },
        {
          " disabled:border-neutral-400 disabled:text-neutral-400 bg-white border-2 border-[color:var(--primary-7)] text-[color:var(--primary-7)]":
            variant === "outline",
        },
        {
          "text-gray-500 border-neutral-400  border": variant === "border",
        },
        { "border-none": variant === "transparent" },
        { "px-2 py-0.5": size === "sm" },
        { "px-4 py-3": size === "md" },
        { "px-6 py-3": size === "lg" },
        { "w-full": block },
        { "font-semibold": bold },
        " flex justify-center items-center",
        className
      )}
      {...props}
    >
      {icon && <div className="mr-2">{icon}</div>}
      {loading && <ImSpinner2 className="animate-spin" />}
      <span>{title}</span>
    </button>
  );
};

export default Button;
