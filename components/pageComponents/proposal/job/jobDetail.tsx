import SkillItem from "@/components/common/SkillItem";
import TextLink from "@/components/common/Text/TextLink";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { GiBrainstorm } from "react-icons/gi";
import { AiOutlineSchedule } from "react-icons/ai";
import { useAppSelector } from "@/stores/hooks";
import moment from "moment";
import { PROJECT_LENGTH } from "@/interfaces";
export interface JobDetailProps {
  showProposal?: boolean;
}

export default function JobDetail({ showProposal }: JobDetailProps) {
  const [isShowMore, setIsShowMore] = useState<boolean>(false);
  const router = useRouter();
  const { detail: proposalDetail } = useAppSelector((state) => state.proposal);
  const { jobDetail } = useAppSelector((state) => state.jobs);

  return (
    <section className="px-8 py-4 border rounded-2xl">
      <h6 className="text-2xl font-medium">Job details</h6>
      <div className="mt-8 flex justify-between py-3 w-full border-b-[1px]">
        <div className="grow pr-2 border-r-[1px]">
          <h1 className="text-xl font-medium">{jobDetail.title}</h1>
          <div className="flex py-5 items-center">
            <SkillItem>Front-End Development</SkillItem>
            <p className="text-[color:var(--gray-7)] text-sm">
              Posted {moment(jobDetail.createdAt).fromNow()}
            </p>
          </div>
          <div
            className={`whitespace-pre-wrap ${
              !isShowMore ? "line-clamp-4" : ""
            }`}
          >
            {jobDetail.description}
          </div>
          <div
            className="hover:cursor-pointer text-[color:var(--primary-7)] font-semibold my-4"
            onClick={() => setIsShowMore(!isShowMore)}
          >
            {isShowMore ? "less" : "more"}
          </div>
          <div className="py-2">
            <TextLink
              href={`/job/${
                router.query.jid ? router.query.jid : jobDetail.id
              }`}
            >
              View job posting
            </TextLink>
          </div>
        </div>
        <div className="w-[35%] pl-2 space-y-4">
          <div className="flex items-start">
            <div className="w-[30px] mt-2">
              <GiBrainstorm />
            </div>
            <div>
              <p className="font-medium capitalize">
                {jobDetail.experienceLevel}
              </p>
              <p className="text-sm text-[color:var(--gray-9)]">
                Experience Level
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="w-[30px] mt-2">
              <GiBrainstorm />
            </div>
            <div>
              <p className="font-medium capitalize">proposal your terms</p>
              <p className="text-sm text-[color:var(--gray-9)]">Fixed Price</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="w-[30px] mt-2">
              <AiOutlineSchedule />
            </div>
            <div>
              <p className="font-medium capitalize">
                {Object.values(PROJECT_LENGTH)
                  .filter((item) => jobDetail.projectLength === item)[0]
                  ?.replaceAll("_", " ")}
              </p>
              <p className="text-sm text-[color:var(--gray-9)]">
                Project Length
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className={`mt-4 ${showProposal && "pb-4 border-b-[1px]"} `}>
        <h6 className="text-lg font-medium mb-3">Skills and expertise</h6>
        <div className="flex flex-wrap">
          <SkillItem className="mb-3">Front-End Development</SkillItem>
          <SkillItem className="mb-3">Front-End Development</SkillItem>
          <SkillItem className="mb-3">Front-End Development</SkillItem>
          <SkillItem className="mb-3">Front-End Development</SkillItem>
          <SkillItem className="mb-3">Front-End Development</SkillItem>
        </div>
      </div>
      {showProposal && (
        <div className="py-4">
          <div className="flex justify-between mb-4">
            <h6 className="text-lg font-medium ">Your proposed terms</h6>
            <span className="text-[color:var(--gray-7)] font-medium">
              Client's budget: $
              {proposalDetail?.amount !== 0
                ? proposalDetail?.amount
                : proposalDetail?.milestones
                    .reduce(
                      (total, current) => total + Number(current.amount),
                      0
                    )
                    .toFixed(2)}
            </span>
          </div>
          <div className="space-y-4">
            <h6 className="font-semibold">Profile</h6>
            <h6 className="font-semibold text-[color:var(--primary-7)]">
              General Profile
            </h6>
            <div>
              <h6 className="font-semibold">How do you want to be paid?</h6>
              <p>
                {proposalDetail?.amount !== 0 ? "By project" : "By milestones"}
              </p>
            </div>
            <div>
              <h6 className="font-semibold">Total price of project</h6>
              <p>
                This includes all milestones, and is the amount your client will
                see.
              </p>
              <p className="mt-2">
                $
                {proposalDetail?.amount !== 0
                  ? proposalDetail?.amount
                  : proposalDetail?.milestones?.reduce(
                        (total, current) => total + Number(current.amount),
                        0
                      )
                      .toFixed(2)}
              </p>
            </div>
            <div>
              <h6 className="font-semibold">Description</h6>
              <p>
                This includes all milestones, and is the amount your client will
                see.
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
