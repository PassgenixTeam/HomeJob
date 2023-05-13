import Button from '@/components/common/Button';
import InputFilter from '@/components/common/InputFilter';
import H1 from '@/components/common/Text/H1';
import H3 from '@/components/common/Text/H3';
import TextNormal from '@/components/common/Text/TextNormal';
import Container from '@/components/layouts/Container';
import ContainerBorder from '@/components/layouts/ContainerBorder';
import ItemJobContract from '@/components/pageComponents/freelancer/myJob/components/ItemJobContract';
import clsx from 'clsx';
import React from 'react';

const MyJob = () => {
  const [activeTab, setActiveTab] = React.useState(0);
  return (
    <Container>
      <div className="w-full mb-8">
        <div className="w-full flex justify-between items-center">
          <div className="flex gap-3 items-center">
            <H1>My Job</H1>
          </div>
          <div className="flex items-center space-x-3">
            <TextNormal className="text-xl">Earnings available now:</TextNormal>
            <TextNormal className="text-xl !text-[color:var(--primary-7)]">0.00$</TextNormal>
          </div>
        </div>
      </div>
      <ContainerBorder>
        <div className="flex justify-between items-center mb-6">
          <H3>Active Contracts</H3>
          <InputFilter iconPosition="left" />
        </div>
        <div className="flex gap-2">
          <div
            className={clsx(' cursor-pointer border-b-2 border-black p-2', activeTab === 0 ? '' : 'border-none')}
            onClick={() => setActiveTab(0)}
          >
            <TextNormal>All</TextNormal>
          </div>
          <div
            className={clsx(' cursor-pointer border-b-2 border-black p-2', activeTab === 1 ? '' : 'border-none')}
            onClick={() => setActiveTab(1)}
          >
            <TextNormal>Active Milestones (1)</TextNormal>
          </div>
          <div
            className={clsx(' cursor-pointer border-b-2 border-black p-2', activeTab === 2 ? '' : 'border-none')}
            onClick={() => setActiveTab(2)}
          >
            <TextNormal>Awaiting Milestones (0)</TextNormal>
          </div>
          <div
            className={clsx(' cursor-pointer border-b-2 border-black p-2', activeTab === 3 ? '' : 'border-none')}
            onClick={() => setActiveTab(3)}
          >
            <TextNormal>Payment Requests (0)</TextNormal>
          </div>
        </div>
        <div>
          <ItemJobContract />
          <ItemJobContract />
          <ItemJobContract />
          <ItemJobContract />
          <ItemJobContract />
          <ItemJobContract />
        </div>
      </ContainerBorder>
    </Container>
  );
};

export default MyJob;
