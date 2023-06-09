import Button from '@/components/common/Button';
import ButtonIcon from '@/components/common/ButtonIcon';
import H4 from '@/components/common/Text/H4';
import H6 from '@/components/common/Text/H6';
import TextMuted from '@/components/common/Text/TextMuted';
import TextNormal from '@/components/common/Text/TextNormal';
import { IJobRespond } from '@/stores/slices/jobs/interface';
import moment from 'moment';
import Link from 'next/link';
import React from 'react';
import { FiMoreHorizontal } from 'react-icons/fi';

interface ItemJobProps {
  job: IJobRespond;
}

const ItemJob = ({ job }: ItemJobProps) => {
  const renderJobTitle = () => {
    if (job.title.length > 20) {
      return job.title.slice(0, 20) + '...';
    }

    return job.title;
  };

  return (
    <div className="w-full border-b py-6 px-8 flex justify-between">
      <div className="w-1/3">
        <H4 title={job.title}>{renderJobTitle()}</H4>
        <TextMuted>Saved {moment(job.createdAt).fromNow()}</TextMuted>
        {/* <TextNormal className="block mt-3">Đã lưu {moment(job.updatedAt).from('MMM DD, YYYY')}</TextNormal> */}
      </div>

      <div className="flex flex-grow justify-between w-1/3">
        <div>
          <H6>{job.proposalCount}</H6>
          <TextMuted>Đấu thầu</TextMuted>
        </div>
        <div>
          <H6>0</H6>
          <TextMuted>Tin nhắn</TextMuted>
        </div>
        {/* <div>
          <H6>0</H6>
          <TextMuted>Hired</TextMuted>
        </div> */}
      </div>
      <div className="flex items-center gap-6 w-1/3 justify-end">
        <div>
          <Link href={`/client/job/${job.id}/proposals`} passHref>
            <Button className="rounded-full font-bold hover:bg-[color:var(--primary-1)] !py-1" title="View Proposals" />
          </Link>
        </div>
        <div>
          <ButtonIcon icon={<FiMoreHorizontal size={21} />} />
        </div>
      </div>
    </div>
  );
};

export default ItemJob;
