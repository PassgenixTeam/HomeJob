import * as React from 'react';
import { AiFillQuestionCircle } from 'react-icons/ai';

export interface  ProposalBannerProps {
}

export default function ProposalBanner (props:  ProposalBannerProps) {
  return (
    <section className='px-8 py-4 border rounded-2xl'>
      <h6 className='text-2xl font-medium'>Proposal Settings</h6>
      <div className='space-y-2 mt-8'>
        <div className='flex items-center space-x-2'>
          <p>This proposal requires </p>
          <span className='font-semibold'>6 Connects</span>
          <div className='text-[color:var(--primary-7)]'>
            <AiFillQuestionCircle/>
          </div>
        </div>
        <p>When you submit this proposal, you'll have <span className='font-semibold'>62 Connects</span> remaining</p>
      </div>
    </section>
  );
}
