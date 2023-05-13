import * as React from "react";
import Image from "next/image";
import TextLink from "@/components/common/Text/TextLink";
import moment from "moment";
import { useAppSelector } from "@/stores/hooks";
import { countryList } from "@/utils/common";
export interface PersonalInfoBarProps {}

export default function PersonalInfoBar(props: PersonalInfoBarProps) {
  const proposalInfo = useAppSelector((state) => state.proposal);
  return (
    <div className="w-full px-8 py-6 border rounded-xl flex space-x-6">
      <div className="w-[80px] h-[80px] relative">
        <div className="h-full w-full  rounded-full overflow-hidden">
          <Image
            src={proposalInfo.detail?proposalInfo.detail.user.avatarUrl:"/images/share_icon_google_hover.png"}
            alt={proposalInfo.detail?.user.firstName+" "+proposalInfo.detail?.user.lastName}
            width={80}
            height={80}
          />
        </div>
        <div
          className="absolute bottom-0 right-0 z-10 h-[20px] 
           w-[20px] rounded-full border-[4px] border-white bg-[color:var(--green-6)]"
        ></div>
      </div>
      <div>
        <TextLink href="/" className="text-[22px]">
          {proposalInfo.detail?.user.firstName+" "+proposalInfo.detail?.user.lastName}
        </TextLink>
        <div className="flex items-center py-1">
          {/* {Array.from(Array(5), (e, i) => (
            <p
              key={i}
              className={`leading-4 font-medium ${
                i !== 0
                  ? "px-2 border-l-[1px] border-l-[color:var(--gray-9)]"
                  : "pr-2"
              }`}
            >
              React
            </p>
          ))} */}
          {proposalInfo.detail?.user.title}
        </div>
        <div className="pt-3">
          <p className="font-medium">{proposalInfo.detail?.user.city||""+" "+countryList.find(item=>item.value===proposalInfo.detail?.user.country)?.label }</p>
          <span className="text-xs font-medium text-[color:var(--gray-8)]">{moment(new Date()).format("LT")} local time</span>
        </div>
      </div>
    </div>
  );
}
