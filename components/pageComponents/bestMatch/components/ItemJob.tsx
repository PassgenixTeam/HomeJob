import ButtonIcon from '@/components/common/ButtonIcon';
import RateStar from '@/components/common/RateStar';
import SkillItem from '@/components/common/SkillItem';
import H5 from '@/components/common/Text/H5';
import TextLink from '@/components/common/Text/TextLink';
import TextMuted from '@/components/common/Text/TextMuted';
import TextNormal from '@/components/common/Text/TextNormal';
import { IJobRespond } from '@/stores/slices/jobs/interface';
import { projectLengthString } from '@/utils/common';
import moment from 'moment';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { AiOutlineHeart } from 'react-icons/ai';
import { BiDislike } from 'react-icons/bi';
import { MdLocationOn, MdVerified } from 'react-icons/md';
import Skeleton from 'react-loading-skeleton';

interface ItemJobProps {
  job: IJobRespond;
}

const ItemJob = ({ job }: ItemJobProps) => {
  const [isLoad, setIsLoad] = React.useState(true);
  const router = useRouter();
  const est = job.jobType === 'fixed' ? `Budget: $${job.budget}` : `$${job.budget}/hr`;
  const projectLength = job.projectLength ? `, ${projectLengthString[job.projectLength]}` : '';

  useEffect(() => {
    setTimeout(() => {
      setIsLoad(false);
    }, 2000);
  }, []);

  const handleClickItem = () => {
    router.push(`/job/${job.id}`);
  };

  if (isLoad) {
    return (
      <div className="p-8 hover:bg-[color:var(--primary-1)] cursor-pointer transition-all duration-200 border-b">
        <div className="flex justify-between items-center mb-4">
          <div>
            <div className="animate-pulse w-40 h-[1.5rem] bg-gray-200 rounded-sm" />
          </div>
        </div>
        <div className="animate-pulse w-[80%] h-[1rem] bg-gray-200 rounded-sm my-4" />
        <div className="animate-pulse w-full h-[1rem] bg-gray-200 rounded-sm my-2" />
        <div className="animate-pulse w-full h-[1rem] bg-gray-200 rounded-sm my-2" />
        <div className="animate-pulse w-[60%] h-[1rem] bg-gray-200 rounded-sm my-2" />
        <br />
        <div className="flex gap-3">
          <div className="animate-pulse w-[4rem] h-[2.2rem] bg-gray-200 rounded-full" />
          <div className="animate-pulse w-[4rem] h-[2.2rem] bg-gray-200 rounded-full" />
          <div className="animate-pulse w-[4rem] h-[2.2rem] bg-gray-200 rounded-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 hover:bg-[color:var(--primary-1)] cursor-pointer transition-all duration-200 border-b" onClick={handleClickItem}>
      <div className="flex justify-between items-center mb-4">
        <div>
          <H5>{job.title}</H5>
        </div>
        <div className="flex gap-3">
          <ButtonIcon icon={<BiDislike size={18} />} />
          <ButtonIcon icon={<AiOutlineHeart size={18} />} />
        </div>
      </div>
      <div className="my-3">
        <TextMuted className="text-xs ">
          {job.jobType} - {job.experienceLevel} - Est. {est}
          {projectLength} - Posted {moment(job.createdAt).fromNow()}
        </TextMuted>
      </div>
      <div className="my-3">
        <TextNormal>{job.description}</TextNormal>
      </div>
      <div className="my-3 flex gap-2 flex-wrap">
        {job.skills.map((skill, index) => (
          <SkillItem key={index}>
            <TextLink href='"'>{skill.name}</TextLink>
          </SkillItem>
        ))}
      </div>
      <div className="flex gap-3 items-center">
        <TextMuted>Proposals:</TextMuted>
        <TextNormal>Less than 5</TextNormal>
      </div>

      <div className="flex gap-3 items-center my-2">
        <div className="flex gap-1 items-center">
          <MdVerified color="var(--primary-5)" size={20} />
          <TextMuted>Payment method verified</TextMuted>
        </div>
        <RateStar rate={100} />
        <div className="flex gap-1 items-center">
          <MdLocationOn color="var(--text-muted)" size={20} />
          <TextMuted>Viet Nam</TextMuted>
        </div>
      </div>
    </div>
  );
};

export default ItemJob;
