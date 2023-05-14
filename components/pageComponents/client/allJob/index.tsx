import React from 'react';
import JobPosting from './JobPosting';
import TextLink from '@/components/common/Text/TextLink';
import TextNormal from '@/components/common/Text/TextNormal';
import Button from '@/components/common/Button';
import Link from 'next/link';

const AllJob = () => {
  return (
    <div className="w-full flex justify-center ">
      <div className="max-w-[1050px] w-full mt-16">
        <div className="w-full flex justify-between items-center">
          <div className="flex gap-3 items-center">
            <TextLink href="/my-jobs">Công việc của tôi</TextLink>
            <span>/</span>
            <TextNormal>Công việc đã đăng</TextNormal>
          </div>
          <div className="flex items-center space-x-5">
            <Link href="/client/create-job">
              <Button className="rounded-full h-[40px] px-8 font-semibold text-base" title="Tạo mới công việc" />
            </Link>
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
