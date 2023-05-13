import React from 'react';
import H2 from '../../common/Text/H2';
import TextLink from '../../common/Text/TextLink';
import H4 from '../../common/Text/H4';
import TextMuted from '../../common/Text/TextMuted';
import ButtonIcon from '../../common/ButtonIcon';
import { FiMoreHorizontal } from 'react-icons/fi';

const JobPosting = () => {
  return (
    <div className="w-full rounded-2xl border py-3 flex flex-col justify-between">
      <div className="flex justify-between items-center px-8 py-3 ">
        <H2>Your Posting</H2>
        <TextLink href="/">see all job posting</TextLink>
      </div>
      {/* card job */}
      <div className="w-full border-b py-6 px-8 flex justify-between">
        <div>
          <H4>I need backend develop</H4>
          <TextMuted className="mt-3">Saved 4 a days ago</TextMuted>
        </div>
        <div>
          <ButtonIcon icon={<FiMoreHorizontal size={21} />} />
        </div>
      </div>
      <div className="w-full border-b py-6 px-8 flex justify-between">
        <div>
          <H4>I need backend develop</H4>
          <TextMuted className="mt-3">Saved 4 a days ago</TextMuted>
        </div>
        <div>
          <ButtonIcon icon={<FiMoreHorizontal size={21} />} />
        </div>
      </div>
      <div className="w-full border-b py-6 px-8 flex justify-between">
        <div>
          <H4>I need backend develop</H4>
          <TextMuted className="mt-3">Saved 4 a days ago</TextMuted>
        </div>
        <div>
          <ButtonIcon icon={<FiMoreHorizontal size={21} />} />
        </div>
      </div>
      <div className="w-full  py-3 px-8 flex justify-between">
        <div>
          <H4>I need backend develop</H4>
          <TextMuted className="mt-3">Saved 4 a days ago</TextMuted>
        </div>
        <div>
          <ButtonIcon icon={<FiMoreHorizontal size={21} />} />
        </div>
      </div>
    </div>
  );
};

export default JobPosting;
