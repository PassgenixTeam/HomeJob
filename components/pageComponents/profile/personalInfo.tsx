import Button from '@/components/common/Button';
import ButtonIcon from '@/components/common/ButtonIcon';
import Timer from '@/components/common/Timer';
import { IModal } from '@/components/pageComponents/profile';
import { MODAL_TYPE } from '@/components/pageComponents/profile/enums/modal-type.enum';
import { IUserProfile } from '@/stores/slices/profile/interface';
import { countryList } from '@/utils/common';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { AiFillThunderbolt } from 'react-icons/ai';
import { MdLocationOn, MdModeEditOutline } from 'react-icons/md';
export interface PersonalInfoProps {
  setModal: React.Dispatch<React.SetStateAction<IModal>>;
  profile: IUserProfile;
}

export default function PersonalInfo({ setModal, profile }: PersonalInfoProps) {
  const { data: session, status } = useSession();

  return (
    <div className="border-b-[1px] border-[color:var(--gray-5)]">
      <div className="flex justify-between items-start p-8">
        <div className="flex justify-center items-start space-x-5">
          <div className="relative h-[80px] w-[80px]">
            <div className="h-full w-full  rounded-full overflow-hidden">
              <Image src={profile.avatarUrl || '/images/share_icon_google_hover.png'} alt={profile.firstName} width={80} height={80} />
            </div>
            <div className="absolute top-0 left-0 z-10">
              <ButtonIcon
                icon={<MdModeEditOutline size={21} />}
                onClick={() =>
                  setModal({
                    isOpen: true,
                    type: MODAL_TYPE.AVATAR,
                  })
                }
              />
            </div>
            <div
              className="absolute bottom-0 right-0 z-10 h-[20px] 
           w-[20px] rounded-full border-[4px] border-white bg-[color:var(--green-6)]"
            ></div>
          </div>
          <div className="space-y-3">
            <p className="text-2xl capitalize font-semibold">{profile.firstName + ' ' + profile.lastName}</p>
            <div className="flex items-center text-[color:var(--gray-7)] space-x-1 capitalize">
              <MdLocationOn />
              <p>{countryList.find((item) => item.value === profile.country)?.label}</p>
              <Timer />
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex items-center px-2 py-[2px] rounded-full border space-x-1 text-xs font-semibold text-[color:var(--gray-7)]">
                <AiFillThunderbolt />
                <p>Available now</p>
              </div>
              <p className="text-xs pr-2">off</p>
              <ButtonIcon icon={<MdModeEditOutline size={21} />} />
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-5">
          <Button variant="outline" className="rounded-full h-[40px] px-8 font-semibold text-base" title="See Public View" />
          <Button className="rounded-full h-[40px] px-8 font-semibold text-base" title="Profile Settings" />
        </div>
      </div>
    </div>
  );
}
