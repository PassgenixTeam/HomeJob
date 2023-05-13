import clsx from "clsx";
import { FC, ReactNode, useRef } from "react";
import { useClickAway } from "react-use";

interface IProps {
  children: ReactNode;
  visible: boolean;
  className: string;
  onClose: () => void;
}

const Dropdown: FC<IProps> = ({ children, visible, className, onClose }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useClickAway(wrapperRef, onClose);

  return (
    <div
      ref={wrapperRef}
      className={clsx(
        "absolute w-40 rounded-sm shadow-md p-2 text-sm bg-white z-10",
        { hidden: !visible },
        className,
      )}
    >
      {children}
    </div>
  );
};

export default Dropdown;
