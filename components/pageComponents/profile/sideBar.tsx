import ButtonIcon from '@/components/common/ButtonIcon';
import H4 from '@/components/common/Text/H4';
import H5 from '@/components/common/Text/H5';
import H6 from '@/components/common/Text/H6';
import TextMuted from '@/components/common/Text/TextMuted';
import TextNormal from '@/components/common/Text/TextNormal';
import { IModal } from '@/components/pageComponents/profile';
import { MODAL_TYPE } from '@/components/pageComponents/profile/enums/modal-type.enum';
import { IUserProfile } from '@/stores/slices/profile/interface';
import { updateProfile } from '@/stores/slices/profile/profileSlice';
import * as React from 'react';
import { BsPlus } from 'react-icons/bs';
import { FiTrash2 } from 'react-icons/fi';
import { HiOutlineTrash, HiPlay } from 'react-icons/hi';
import { MdModeEditOutline } from 'react-icons/md';
import { useDispatch } from 'react-redux';

export interface SidebarProps {
  setModal: React.Dispatch<React.SetStateAction<IModal>>;
  profile: IUserProfile;
}

export default function Sidebar({ profile, setModal }: SidebarProps) {
  const dispatch = useDispatch();

  const handleRemoveVideo = () => {
    dispatch(updateProfile({ videoOverview: null }));
    setModal({ isOpen: false, type: null });
  };

  return (
    <div className="p-8 w-[35%] border-r-[1px] border-[color:var(--gray-5)] space-y-6">
      <div>
        <div className="flex items-center space-x-3">
          {profile.videoOverview ? (
            <div>
              <div className="flex gap-3 items-center">
                <H5>Meet {profile.firstName + ' ' + profile.lastName}</H5>
                <ButtonIcon icon={<FiTrash2 size={16} onClick={handleRemoveVideo} />} />
              </div>
              <div
                className="relative mt-3 cursor-pointer"
                onClick={() => {
                  setModal({ isOpen: true, type: MODAL_TYPE.VIEW_VIDEO_OVERVIEW });
                }}
              >
                <img
                  src={`https://img.youtube.com/vi/${profile.videoOverview!.url!.split('?v=')[1]}/maxresdefault.jpg`}
                  alt={profile.videoOverview!.url!}
                />
                <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                  <HiPlay size={60} color="#FFFFFF" />
                </div>
              </div>
            </div>
          ) : (
            <div className="flex gap-3">
              <H5 className="font-semibold">Video introduction</H5>
              <ButtonIcon
                icon={
                  <BsPlus
                    size={26}
                    onClick={() => {
                      setModal({ isOpen: true, type: MODAL_TYPE.VIDEO_OVERVIEW });
                    }}
                  />
                }
              />
            </div>
          )}
        </div>
      </div>
      <div className="space-y-1">
        <div className="flex items-center space-x-3">
          <H5 className="font-semibold">Hours per week</H5>
          <ButtonIcon
            icon={
              <MdModeEditOutline
                size={21}
                onClick={() => {
                  setModal({ isOpen: true, type: MODAL_TYPE.HOURS_PER_WEEK });
                }}
              />
            }
          />
        </div>
        <TextNormal>{profile.hoursPerWeek}</TextNormal>
        <TextMuted className="text-[color:var(--gray-7)]">
          {profile.contractToHire ? 'Open to contract to hire' : 'No contract-to-hire preference set'}
        </TextMuted>
      </div>
      <div className="space-y-1">
        <div className="flex items-center space-x-3">
          <H5 className="font-semibold">Languages</H5>
          <ButtonIcon icon={<BsPlus size={26} />} />
          <ButtonIcon icon={<MdModeEditOutline size={21} />} />
        </div>
        <div className="flex gap-2">
          <H6 className="font-semibold">English:</H6>
          <TextMuted>Basic</TextMuted>
        </div>
      </div>
      <div className="space-y-[6px]">
        <div className="flex items-center space-x-3">
          <H5 className="font-semibold">Verifications</H5>
        </div>
        <div className="flex space-x-3 items-center">
          <H6 className="font-normal">Military Veteran</H6>
          <ButtonIcon icon={<BsPlus size={26} />} />
        </div>
      </div>
      <div className="space-y-1">
        <div className="flex items-center space-x-3">
          <H5 className="font-semibold">Education</H5>
          <ButtonIcon icon={<BsPlus size={26} />} />
        </div>
        <div className="flex justify-between items-center">
          <div>
            <H5 className="font-semibold">LSS University</H5>
            <TextMuted>2022-2222</TextMuted>
          </div>
          <div className="space-x-2">
            <ButtonIcon icon={<MdModeEditOutline size={21} />} />
            <ButtonIcon icon={<HiOutlineTrash size={21} />} />
          </div>
        </div>
      </div>
    </div>
  );
}
