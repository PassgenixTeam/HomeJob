import InputFilter from '@/components/common/InputFilter';
import H1 from '@/components/common/Text/H1';
import H2 from '@/components/common/Text/H2';
import H3 from '@/components/common/Text/H3';
import TextNormal from '@/components/common/Text/TextNormal';
import ContainerBorder from '@/components/layouts/ContainerBorder';
import ItemJob from '@/components/pageComponents/bestMatch/components/ItemJob';
import { getJobs, selectJobs } from '@/stores/slices/jobs/jobsSlide';
import clsx from 'clsx';
import moment from 'moment';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

const MainBestMatch = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [activeTab, setActiveTab] = React.useState(0);

  const jobs = selectJobs();

  useEffect(() => {
    dispatch(getJobs());
  }, []);

  const greeting = () => {
    const hour = moment().hour();
    let greetingText = '';
    if (hour >= 0 && hour < 12) {
      greetingText = 'Good Morning!';
    } else if (hour >= 12 && hour < 18) {
      greetingText = 'Good Afternoon!';
    } else {
      greetingText = 'Good Evening!';
    }
    return greetingText;
  };
  const handleSearch = (valueSearch: string) => {
    router.push(`/job/search/?q=${valueSearch}`);
  };

  return (
    <div className="w-full pr-4">
      <ContainerBorder className="relative !py-10">
        <div>
          <H3>{moment().format('dddd, MMMM Do')}</H3>
          <H1>{greeting()}</H1>
        </div>
        <img className="absolute right-3 top-3" src="images/send.svg" alt="" height={150} width={150} />
      </ContainerBorder>
      <div className="mt-8">
        <InputFilter onSearch={(value: string) => handleSearch(value)} />
      </div>
      <ContainerBorder className="mt-8 !px-0">
        <H2 className="px-8 mb-4">Jobs you might like</H2>

        <div className="flex border-b-[1px] px-8">
          <div
            className={clsx(' cursor-pointer border-b-2 border-black p-2', activeTab === 0 ? '' : 'border-none')}
            onClick={() => setActiveTab(0)}
          >
            <TextNormal>Best Matches</TextNormal>
          </div>
          <div
            className={clsx(' cursor-pointer border-b-2 border-black p-2', activeTab === 1 ? '' : 'border-none')}
            onClick={() => setActiveTab(1)}
          >
            <TextNormal>Most Recent</TextNormal>
          </div>
          <div
            className={clsx(' cursor-pointer border-b-2 border-black p-2', activeTab === 2 ? '' : 'border-none')}
            onClick={() => setActiveTab(2)}
          >
            <TextNormal>Save Jobs</TextNormal>
          </div>
        </div>
        <div className="block">
          <div className="px-8 mb-4">
            <TextNormal>Browse jobs that match your experience to a client&apos;s hiring preferences. Ordered by most relevant.</TextNormal>
          </div>
          {jobs.map((job) => (
            <ItemJob key={Math.random()} job={job} />
          ))}
        </div>
      </ContainerBorder>
    </div>
  );
};

export default MainBestMatch;
