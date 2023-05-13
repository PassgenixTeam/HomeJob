import ButtonIcon from '@/components/common/ButtonIcon';
import * as React from 'react';
import { MdModeEditOutline } from 'react-icons/md';
import { BiLinkAlt } from 'react-icons/bi';
import { BsPlus } from 'react-icons/bs';
import { skillList } from '@/utils/common';
import Button from '@/components/common/Button';
import { IModal } from '@/components/pageComponents/profile';
import { MODAL_TYPE } from '@/components/pageComponents/profile/enums/modal-type.enum';
import { IUserProfile } from '@/stores/slices/profile/interface';

export interface MainProfileProps {
  setModal: React.Dispatch<React.SetStateAction<IModal>>;
  profile: IUserProfile;
}

export default function MainProfile({ setModal, profile }: MainProfileProps) {
  return (
    <div className="w-[65%] h-fit">
      <div className="w-full h-fit p-8  border-b-[1px] border-[color:var(--gray-5)] space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-xl inline">
            {profile.title || 'Title'}
            <span className="ml-4">
              <ButtonIcon
                icon={
                  <MdModeEditOutline
                    size={21}
                    onClick={() =>
                      setModal({
                        isOpen: true,
                        type: MODAL_TYPE.TITLE,
                      })
                    }
                  />
                }
              />
            </span>
          </h1>
          <div className="flex items-center space-x-3">
            <p className="font-bold text-lg">${(profile.hourlyRate || 0).toFixed(2)}/hr</p>
            <ButtonIcon
              icon={
                <MdModeEditOutline
                  size={21}
                  onClick={() =>
                    setModal({
                      isOpen: true,
                      type: MODAL_TYPE.HOURLY_RATE,
                    })
                  }
                />
              }
            />
            <ButtonIcon icon={<BiLinkAlt size={21} />} />
          </div>
        </div>
        <div className="flex ">
          <p className="whitespace-pre-wrap">{profile.overview}</p>
          <ButtonIcon
            icon={
              <MdModeEditOutline
                size={21}
                onClick={() =>
                  setModal({
                    isOpen: true,
                    type: MODAL_TYPE.OVERVIEW,
                  })
                }
              />
            }
          />
        </div>
      </div>
      <div className="w-full h-fit p-8  border-b-[1px] border-[color:var(--gray-5)]">
        <h6 className="font-semibold text-lg pb-3">Work History</h6>
        <p className="leading-5">No work yet. Once you start getting hired on Upwork, your work with clients will show up here.</p>
        <p className="font-semibold text-[color:var(--primary-8)] hover:cursor-pointer">Start your search</p>
      </div>
      <div className="w-full h-fit p-8  border-b-[1px] border-[color:var(--gray-5)] space-y-3">
        <div className="flex space-x-4">
          <h6 className="font-semibold text-lg pb-3">Work History</h6>
          <ButtonIcon icon={<BsPlus size={26} />} />
        </div>
        <div>
          <p className="leading-5 text-center">Talent who add portfolios to their profile are more likely to win work. (+20%)</p>
          <p className="font-semibold text-[color:var(--primary-8)] hover:cursor-pointer text-center">Add a portfolio</p>
        </div>
      </div>
      <div className="w-full h-fit p-8  border-b-[1px] border-[color:var(--gray-5)] space-y-3">
        <div className="flex space-x-4">
          <h6 className="font-semibold text-lg pb-3">Skills</h6>
          <ButtonIcon icon={<MdModeEditOutline size={21} />} />
        </div>
        <div className="flex flex-wrap">
          {skillList.map((item, index) => (
            <div
              className="py-[2px] px-2 text-sm text-[color:var(--gray-9)] rounded-full bg-[color:var(--primary-2)] mr-2 mb-2"
              key={index}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
      <div className="w-full h-fit p-8 space-y-3">
        <div className="flex space-x-4 justify-between items-center">
          <h6 className="font-semibold text-lg pb-3">Your Project Catalog</h6>
          <Button title="Manage Project" className="py-[2px] rounded-full" variant="outline" />
        </div>
        <div className="flex flex-wrap">
          <p>
            Projects are a new way to earn on Upwork that helps you do more of the work you love to do. Create project offerings that
            highlight your strengths and attract more clients
          </p>
        </div>
      </div>
    </div>
  );
}
