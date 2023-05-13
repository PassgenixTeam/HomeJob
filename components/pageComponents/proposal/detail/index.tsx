import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import React,{useEffect} from "react";
import JobDetail from "../job/jobDetail";
import AboutClient from "./aboutClient";
import {useRouter} from "next/router"
import { getProposal } from "@/stores/slices/proposal/proposalSlide";
export interface ProposalDetailProps {}

export default function ProposalDetail(props: ProposalDetailProps) {
  const router = useRouter()
  return (
    <div className="flex justify-center w-full">
      <div className="w-full max-w-[1050px] px-4 space-y-8 text-[color:var(--gray-9)]">
        <h6 className="px-12 text-3xl font-medium pb-4 pt-6">
          Proposal details
        </h6>
        <div className="flex justify-between space-x-6">
          <div className="grow">
            <JobDetail showProposal/>
          </div>
            <AboutClient/>
        </div>
      </div>
    </div>
  );
}
