import * as React from 'react';
import RightSide from './rightSide';
import JobInfo from './jobInfo';
import { useRouter } from 'next/router';
import { useAppSelector } from '@/stores/hooks';

export interface JobDetailProps {}

export default function JobDetail(props: JobDetailProps) {
  const router = useRouter();
  const { jid: JobId } = router.query;
  const jobInfo = useAppSelector((state) => state.jobs);

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-[1050px] px-4 space-y-8">
        <h6 className="text-4xl font-bold text-center py-3 my-6 text-[color:var(--gray-9)]">Chi tiết công việc</h6>
        <div className="border rounded-2xl  flex ">
          <JobInfo jobDetail={jobInfo.jobDetail} />
          <RightSide />
        </div>
      </div>
    </div>
  );
}
