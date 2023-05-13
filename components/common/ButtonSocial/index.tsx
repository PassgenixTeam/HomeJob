import Image from "next/image";
import * as React from "react";

export interface ButtonSocialProps {
  imgUrl: string;
  label: string;
  action?: any;
}

export default function ButtonSocial({
  imgUrl,
  label,
  action,
}: ButtonSocialProps) {
  return (
    <div 
    className="border border-[color:var(--gray-7)] rounded-[40px]
     bg-white py-2 px-6 w-full flex items-center hover:cursor-pointer"
     onClick={()=>action&&action()}
     >
      <div className="w-fit h-fit rounded-[50%] overflow-hidden mr-4">
        <Image
          src={imgUrl || "/images/share_icon_google_hover.png"}
          alt={label}
          width={30}
          height={30}
        />
      </div>
      <div className="font-semibold">{label}</div>
    </div>
  );
}
