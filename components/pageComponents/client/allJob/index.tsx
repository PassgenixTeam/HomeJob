import React from 'react';
import JobPosting from './JobPosting';
import TextLink from '@/components/common/Text/TextLink';
import TextNormal from '@/components/common/Text/TextNormal';
import Button from '@/components/common/Button';

const AllJob = () => {
  return (
    <div className="w-full flex justify-center ">
      <div className="max-w-[1050px] w-full mt-16">
        <div className="w-full flex justify-between items-center">
          <div className="flex gap-3 items-center">
            <TextLink href="/my-jobs">My Job</TextLink>
            <span>/</span>
            <TextNormal>Job Postings</TextNormal>
          </div>
          <div className="flex items-center space-x-5">
            <Button className="rounded-full h-[40px] px-8 font-semibold text-base" title="Post a New Job" />
          </div>
        </div>

        <div className="mt-10">
          <JobPosting />
        </div>
      </div>
    </div>
  );
};

export default AllJob;
