import Button from '@/components/common/Button';
import ButtonIcon from '@/components/common/ButtonIcon';
import H4 from '@/components/common/Text/H4';
import H6 from '@/components/common/Text/H6';
import TextMuted from '@/components/common/Text/TextMuted';
import TextNormal from '@/components/common/Text/TextNormal';
import TextSmall from '@/components/common/Text/TextSmall';
import React from 'react';
import { FiMoreHorizontal } from 'react-icons/fi';

const ItemJobContract = () => {
  return (
    <div className="w-full border-b py-6 px-8 flex flex-col justify-between">
      <div className="w-full flex justify-between items-center ">
        <H4>I need backend develop</H4>
        <div className="flex items-center gap-6 w-1/3 justify-end">
          <div>
            <Button className="rounded-full font-bold hover:bg-[color:var(--primary-1)] !py-1" title="Submit Word for Payment" />
          </div>
          <div>
            <ButtonIcon icon={<FiMoreHorizontal size={21} />} />
          </div>
        </div>
      </div>
      <div className="w-full flex justify-between mt-3">
        <div className="flex flex-col">
          <TextNormal>Hired by: Thang Nguyen</TextNormal>
          <TextSmall className="!text-[color:var(--text-muted)]">Thang Nguyen</TextSmall>
        </div>
        <div className="flex flex-col">
          <TextNormal>Active: Milestone 1</TextNormal>
          <TextSmall className="!text-[color:var(--text-muted)]">I need build an E-commerce website with MERN </TextSmall>
          <br />
          <TextSmall className="!text-[color:var(--text-muted)]">$10.00 Budget</TextSmall>
          <TextSmall className="!text-[color:var(--text-muted)]">$10.00 in Escrow</TextSmall>
        </div>
        <div className="flex flex-col">
          <TextNormal>Apr 18 - Present</TextNormal>
        </div>
      </div>
    </div>
  );
};

export default ItemJobContract;
