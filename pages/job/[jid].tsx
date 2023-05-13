import HomeLayout from "@/components/layouts/homeLayout";
import JobDetail from "@/components/pageComponents/jobDetail";
import React, { ReactNode, useEffect } from "react";
import { GetServerSideProps } from "next";
import { JobService } from "@/utils/services/jobService";
import { IJobRespond } from "@/stores/slices/jobs/interface";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { getJobDetailSuccess } from "@/stores/slices/jobs/jobsSlide";
import _ from "lodash";
import { wrapper } from "@/stores/store";
export interface JosDetailPageProps {
  jobDetail:IJobRespond
}

export default function JosDetailPage({jobDetail}: JosDetailPageProps) {
  const job = useAppSelector(state=>state.jobs)
  if(_.isEmpty(jobDetail)){
    return (
      <div>
        Job posting profile cannot be found 
      </div>
    )
  }
  return (
    <div>
      <JobDetail />
    </div>
  );
}

JosDetailPage.getLayout = (page: ReactNode) => {
  return <HomeLayout>{page}</HomeLayout>;
};

JosDetailPage.auth = {
  unauthorized: "/login",
};
export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  (store)=>async (context) => {
    const { jid: JobId } = context.query;
    //@ts-ignore
    const jobDetail = await JobService.getJobById(JobId)
      .then((res) => res.data.data)
      .catch((err) => {
        console.log("Error in Job Page", err);
        return {};
      });
    await store.dispatch(getJobDetailSuccess(jobDetail))
    return {
      props: {
        jobDetail,
      },
    };
  }
) ;
