import Button from '@/components/common/Button';
import ButtonIcon from '@/components/common/ButtonIcon';
import H4 from '@/components/common/Text/H4';
import TextMuted from '@/components/common/Text/TextMuted';
import TextNormal from '@/components/common/Text/TextNormal';
import { IJobRespond } from '@/stores/slices/jobs/interface';
import moment from 'moment';
import React from 'react';
import { FiMoreHorizontal } from 'react-icons/fi';

interface ItemJobDraftProps {
  job: IJobRespond;
}

const ItemJobDraft = ({ job }: ItemJobDraftProps) => {
  return (
    <div className="w-full border-b py-6 px-8 flex justify-between">
      <div>
        <H4>{job.title}</H4>
        <TextMuted>Saved {moment(job.createdAt).fromNow()}</TextMuted>
        <TextNormal className="block mt-3">Draft - Saved {moment(job.updatedAt).format('MMM DD, YYYY')}</TextNormal>
      </div>

      <div className="flex items-center gap-6">
        <div>
          <Button className="rounded-full font-bold hover:bg-[color:var(--primary-1)] !py-1" title="Edit Draft" />
        </div>
        <div>
          <ButtonIcon icon={<FiMoreHorizontal size={21} />} />
        </div>
      </div>
    </div>
  );
};

export default ItemJobDraft;
