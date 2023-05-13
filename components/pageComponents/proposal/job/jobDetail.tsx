import SkillItem from '@/components/common/SkillItem';
import TextLink from '@/components/common/Text/TextLink';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { GiBrainstorm } from 'react-icons/gi';
import { AiOutlineSchedule } from 'react-icons/ai';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import moment from 'moment';
import { PROJECT_LENGTH } from '@/interfaces';
import { IoIosPricetags } from 'react-icons/io';
import { SiLevelsdotfyi } from 'react-icons/si';
import { getJobDetail } from '@/stores/slices/jobs/jobsSlide';

export interface JobDetailProps {
  showProposal?: boolean;
}

export default function JobDetail({ showProposal }: JobDetailProps) {
  const dispatch = useAppDispatch();
  const [isShowMore, setIsShowMore] = useState<boolean>(false);
  const router = useRouter();
  const { detail: proposalDetail } = useAppSelector((state) => state.proposal);
  const { jobDetail } = useAppSelector((state) => state.jobs);

  useEffect(() => {
    if (router.query.jid) dispatch(getJobDetail(router.query.jid as string));
  }, []);

  const renderJobDescription = (description: string) => {
    if (isShowMore) {
      return description;
    }

    return description.slice(0, 200) + '...';
  };

  return (
    <section className="px-8 py-4 border rounded-2xl">
      <h6 className="text-2xl font-medium">Chi tiết công việc</h6>
      <div className="mt-8 flex justify-between py-3 w-full">
        <div className="grow pr-2 ">
          <h1 className="text-xl font-medium">{jobDetail.title}</h1>
          <div className="flex py-5 items-center">
            {/* <SkillItem>Front-End Development</SkillItem> */}
            <p className="text-[color:var(--gray-7)] text-sm">Posted {moment(jobDetail.createdAt).fromNow()}</p>
          </div>
          <div>
            <div className="flex text-[color:var(--gray-11)] space-x-24">
              <div className="flex space-x-3">
                <div className="mt-1 ">
                  <IoIosPricetags size={20} />
                </div>
                <div>
                  <p className="font-medium">${jobDetail.budget} triệu VND</p>
                  <p className="text-sm text-[color:var(--gray-7)]">Tổng chi phí dự kiến</p>
                </div>
              </div>
              <div className="flex space-x-3">
                <div className="mt-1 ">
                  <SiLevelsdotfyi size={20} />
                </div>
                <div>
                  <p className="font-medium">{jobDetail.estimate} Ngày</p>
                  <p className="text-sm text-[color:var(--gray-7)]">Tổng thời gian dự tính</p>
                </div>
              </div>
            </div>
          </div>
          <div className={`mt-12 whitespace-pre-wrap ${!isShowMore ? 'line-clamp-4' : ''}`}>
            {renderJobDescription(jobDetail.description)}
          </div>
          {jobDetail.description.length > 200 ? (
            <div
              className="hover:cursor-pointer text-[color:var(--primary-7)] font-semibold my-4"
              onClick={() => setIsShowMore(!isShowMore)}
            >
              {isShowMore ? 'less' : 'more'}
            </div>
          ) : null}
          <div className="py-2 mt-4">
            <TextLink href={`/job/${router.query.jid ? router.query.jid : jobDetail.id}`}>Xem lại chỉ tiết công việc</TextLink>
          </div>
        </div>
      </div>

      {showProposal && (
        <div className="py-4">
          <h6 className="text-lg font-medium ">Thông tin đấu thầu của bạn</h6>

          <div className="flex gap-4 mt-2">
            <h6 className="font-semibold">Tổng chi phí đấu thầu:</h6>
            <p>{proposalDetail?.estimateBudget} Triệu VND</p>
          </div>
          <div className="flex gap-4 mt-2">
            <h6 className="font-semibold">Ngày dự kiến hoàn thành:</h6>
            <p>{proposalDetail?.estimatedTime} Ngày</p>
          </div>
          <div className="flex gap-4 mt-2">
            <h6 className="font-semibold">Số lượng nhân công:</h6>
            <p>{proposalDetail?.estimatedLabor} Nhân công</p>
          </div>
        </div>
      )}
    </section>
  );
}
