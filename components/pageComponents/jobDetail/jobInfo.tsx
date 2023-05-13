import SkillItem from "@/components/common/SkillItem";
import { EXPERIENCE_LEVEL } from "@/interfaces";
import { IJobRespond } from "@/stores/slices/jobs/interface";
import moment from "moment";
import * as React from "react";
import { AiFillQuestionCircle } from "react-icons/ai";
import { ImLocation2 } from "react-icons/im";
import { IoIosPricetags } from "react-icons/io";
import { SiLevelsdotfyi } from "react-icons/si";

export interface JobInfoProps {
  jobDetail: IJobRespond;
}

export default function JobInfo({ jobDetail }: JobInfoProps) {
  return (
    <div className="w-[70%] text-[color:var(--gray-9)]">
      <div className="px-8 py-8 border-b-[1px] border-b-[color:var(--gray-5)]">
        <header>
          <h1 className="text-2xl font-semibold capitalize">
            {jobDetail.title}
          </h1>
        </header>
        <section className="mt-10">
          <p className="text-[color:var(--primary-7)] font-semibold underline">
            Front-End Development
          </p>
          <p className="text-[color:var(--gray-7)]">
            Posted {moment(jobDetail.createdAt).fromNow()}
          </p>
          <div className="flex items-center space-x-1 mt-3">
            <ImLocation2 color="#096dd9" />
            <p>Worldwide</p>
          </div>
        </section>
      </div>
      <section className="px-8 py-8 border-b-[1px] border-b-[color:var(--gray-5)] whitespace-pre-wrap">
        {jobDetail.description}
      </section>
      <section className="px-8 py-8 border-b-[1px] border-b-[color:var(--gray-5)]">
        <div className="flex text-[color:var(--gray-11)] space-x-24">
          <div className="flex space-x-3">
            <div className="mt-1 ">
              <IoIosPricetags size={20} />
            </div>
            <div>
              <p className="font-medium">
                $
                {jobDetail.budget !== 0
                  ? jobDetail.budget
                  : `${jobDetail.hourlyFrom} - ${jobDetail.hourlyTo}`}
              </p>
              <p className="text-sm text-[color:var(--gray-7)]">Fixed-price</p>
            </div>
          </div>
          <div className="flex space-x-3">
            <div className="mt-1 ">
              <SiLevelsdotfyi size={20} />
            </div>
            <div>
              <p className="font-medium capitalize">
                {jobDetail.experienceLevel === EXPERIENCE_LEVEL.ENTRY_LEVEL
                  ? "Entry"
                  : jobDetail.experienceLevel}{" "}
                Level
              </p>
              <p className="text-sm text-[color:var(--gray-7)]">
                {jobDetail.experienceLevel === EXPERIENCE_LEVEL.ENTRY_LEVEL
                  ? "Looking for someone relatively new to this field":jobDetail.experienceLevel === EXPERIENCE_LEVEL.INTERMEDIATE?
                  "Looking for substantial experience in this field"
                  : "Looking for comprehensive and deep expertise in this field"}
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="px-8 py-6 border-b-[1px] border-b-[color:var(--gray-5)]">
        <p>
          <span className="font-medium">Project Type:</span> Ongoing project
        </p>
      </section>
      <section className="px-8 py-6 border-b-[1px] border-b-[color:var(--gray-5)]">
        <p className="font-medium">
          You will be asked to answer the following questions when submitting a
          proposal:
        </p>
        <ul className="space-y-1">
          <li>1. Show me some work you did using Javascript</li>
          <li>2. Do you have experience making fetch or axios requests?</li>
          <li>
            3. Are you okay to be paid 28-30k PKR ($100 USD) per month to work
            Monday - Saturday 8 am - 5 pm EST timezone?
          </li>
        </ul>
      </section>
      <section className="px-8 py-6 border-b-[1px] border-b-[color:var(--gray-5)]">
        <p className="font-medium mb-6">Skills and Expertise</p>
        <div className="flex items-center flex-wrap ">
          {jobDetail.skills?.map((item,index)=>(
            <SkillItem
            key={index}
            className="underline"
            >
              {item.name}
            </SkillItem>
          ))}
        </div>
      </section>
      <section className="px-8 py-6">
        <p className="font-medium mb-6">Activity on this job</p>
        <div className="">
          <div className="flex items-center space-x-2">
            <p className="text-[color:var(--gray-7)]">Proposals:</p>
            <div className="flex items-center  space-x-1">
              <AiFillQuestionCircle color="#096dd9" />
              <p>10 to 15</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <p className="text-[color:var(--gray-7)]">Last viewed by client:</p>
            <div className="flex items-center  space-x-1">
              <AiFillQuestionCircle color="#096dd9" />
              <p> 1 hour ago</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <p className="text-[color:var(--gray-7)]">Interviewing</p>
            <div className="flex items-center  space-x-1">
              <p>7</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <p className="text-[color:var(--gray-7)]">Invites sent:</p>
            <div className="flex items-center  space-x-1">
              <p>0</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <p className="text-[color:var(--gray-7)]">Unanswered invites</p>
            <div className="flex items-center  space-x-1">
              <p>0</p>
            </div>
          </div>
        </div>
        <div className="flex items-center mt-6 space-x-1">
          <p className="font-medium ">
            Upgrade your membership to see the bid range
          </p>
          <AiFillQuestionCircle color="#096dd9" />
        </div>
      </section>
    </div>
  );
}
