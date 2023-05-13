import MainBestMatch from '@/components/pageComponents/bestMatch/MainBestMatch';
import SideBar from '@/components/pageComponents/bestMatch/SideBar';
import React from 'react';

const BestMatch = () => {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="flex flex-wrap justify-between">
        <div className="w-9/12">
          <MainBestMatch />
        </div>
        <div className="w-3/12">
          <SideBar />
        </div>
      </div>
    </div>
  );
};

export default BestMatch;
