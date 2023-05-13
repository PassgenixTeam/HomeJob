import Button from '@/components/common/Button';
import * as React from 'react';

export interface  BannerProps {
}

export default function Banner (props:  BannerProps) {
  return (
    <div className='w-full h-[200px] rounded-2xl border py-6 px-8 flex flex-col justify-between'>
      <h1 className='text-4xl font-semibold font'>Better market your expertise with specialized profiles</h1>
      <p>Specialized profiles allow you to display more specific skills, deliverables, and more – and help power better search results and job recommendations</p>
      <Button title='Create a Specialized Profile' className="w-fit py-[3px] px-[16px] font-semibold"/>
    </div>
  );
}
