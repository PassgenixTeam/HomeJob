import clsx from 'clsx';
import React from 'react';
import { AiFillStar } from 'react-icons/ai';

interface RateStarProps {
  rate: number;
}

const RateStar = ({ rate }: RateStarProps) => {
  return (
    <div className="flex items-center relative">
      <div className="text-[color:var(--gray-5)] w-[110px] left-0 top-0 z-0">
        <div className="flex items-center ">
          <AiFillStar size={22} />
          <AiFillStar size={22} />
          <AiFillStar size={22} />
          <AiFillStar size={22} />
          <AiFillStar size={22} />
        </div>
      </div>
      <div className="text-[color:var(--primary-7)] w-[110px] overflow-hidden absolute left-0 top-0 z-10">
        <div
          className="overflow-hidden"
          style={{
            width: `${rate}%`,
          }}
        >
          <div className="w-[110px] flex items-center ">
            <AiFillStar size={22} />
            <AiFillStar size={22} />
            <AiFillStar size={22} />
            <AiFillStar size={22} />
            <AiFillStar size={22} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RateStar;
