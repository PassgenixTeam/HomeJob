import HomeLayout from "@/components/layouts/homeLayout";
import React, { ReactNode, useEffect } from "react";
import { GetServerSideProps } from "next";
import { wrapper } from "@/stores/store";
import ProposalDetail from "@/components/pageComponents/proposal/detail";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { getProposal } from "@/stores/slices/proposal/proposalSlide";
import {useRouter} from "next/router"
export interface ProposalDetailPageProps {}

export default function ProposalDetailPage(props: ProposalDetailPageProps) {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const {pid} = router.query
  useEffect(()=>{
    dispatch({
      type:getProposal(pid as string).type,
      payload:pid
    })
  },[])
  return (
    <ProposalDetail/>
  );
}

ProposalDetailPage.getLayout = (page: ReactNode) => {
  return <HomeLayout>{page}</HomeLayout>;
};
ProposalDetailPage.auth = {
  unauthorized: "/login",
};
