import SkillItem from '@/components/common/SkillItem';
import { EXPERIENCE_LEVEL } from '@/interfaces';
import { IJobRespond } from '@/stores/slices/jobs/interface';
import moment from 'moment';
import * as React from 'react';
import { AiFillQuestionCircle } from 'react-icons/ai';
import { ImLocation2 } from 'react-icons/im';
import { IoIosPricetags } from 'react-icons/io';
import { SiLevelsdotfyi } from 'react-icons/si';

export interface JobInfoProps {
  jobDetail: IJobRespond;
}

export default function JobInfo({ jobDetail }: JobInfoProps) {
  return (
    <div className="w-[70%] text-[color:var(--gray-9)]">
      <div className="px-8 py-8 border-b-[1px] border-b-[color:var(--gray-5)]">
        <header>
          <h1 className="text-2xl font-semibold capitalize">{jobDetail.title}</h1>
        </header>
      </div>
      <section className="px-8 py-8 border-b-[1px] border-b-[color:var(--gray-5)]">
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
      </section>
      <section className="px-8 py-8 border-b-[1px] border-b-[color:var(--gray-5)] whitespace-pre-wrap">{jobDetail.description}</section>
      <section>
        {jobDetail.attachments?.length > 0 && (
          <div className="px-8 py-8 border-b-[1px] border-b-[color:var(--gray-5)]">
            <h3 className="text-xl font-semibold">Tệp đính kèm</h3>
            <div className="flex flex-wrap gap-4 mt-4">
              {jobDetail.attachments.map((item, index) => (
                <div key={index} className="w-[calc(50%-1rem)]">
                  <div className="flex items-center gap-2">
                    <AiFillQuestionCircle size={20} />

                    <a
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[color:var(--gray-11)] hover:text-[color:var(--primary)]"
                    >
                      <img src={item.url} alt="" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
