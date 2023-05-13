import React from 'react';
import Button from '../../common/Button';
import DraftJob from './DraftJob';
import JobPosting from './JobPosting';

const MyJob = () => {
  return (
    <div className="w-full flex justify-center ">
      <div className="max-w-[1050px] w-full mt-16">
        <div className="w-full flex justify-between items-center">
          <h1 className="text-4xl">Your Dashboard</h1>
          <div className="flex items-center space-x-5">
            <Button variant="outline" className="rounded-full h-[40px] px-8 font-semibold text-base" title="Browse Project Catalog" />
            <Button className="rounded-full h-[40px] px-8 font-semibold text-base" title="Post a Job" />
          </div>
        </div>

        <div className="mt-10">
          <DraftJob />
          <br />
          <br />
          <JobPosting />
        </div>
      </div>
    </div>
  );
};

export default MyJob;
