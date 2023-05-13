import ButtonIcon from '@/components/common/ButtonIcon';
import ModalCommon from '@/components/common/ModalCommon/ModalCommon';
import H3 from '@/components/common/Text/H3';
import H4 from '@/components/common/Text/H4';
import H5 from '@/components/common/Text/H5';
import H6 from '@/components/common/Text/H6';
import TextLink from '@/components/common/Text/TextLink';
import TextMuted from '@/components/common/Text/TextMuted';
import TextNormal from '@/components/common/Text/TextNormal';
import TextSmall from '@/components/common/Text/TextSmall';
import ContainerBorder from '@/components/layouts/ContainerBorder';
import { IModal } from '@/components/pageComponents/profile';
import { MODAL_TYPE } from '@/components/pageComponents/profile/enums/modal-type.enum';
import { useAppSelector } from '@/stores/hooks';
import { selectUserInfo } from '@/stores/slices/login/loginSlide';
import { IUserProfile } from '@/stores/slices/profile/interface';
import Link from 'next/link';
import React from 'react';
import { MdModeEditOutline } from 'react-icons/md';

const SideBar = () => {
  const [modal, setModal] = React.useState<IModal>({ isOpen: false, type: null });

  const user = useAppSelector(selectUserInfo);

  return (
    <div className="w-full pl-4">
      <ContainerBorder className="!px-0">
        <div className="flex flex-col items-center px-8 pb-6">
          <div>
            <img src={user.avatarUrl} alt="" className="rounded-full w-[60px] h-[60px]" />
          </div>
          <div className="mt-6">
            <Link href={'/profile'}>
              <H4 className="underline cursor-pointer hover:text-[color:var(--primary-5)] transition-all duration-100">{user.firstName}</H4>
            </Link>
          </div>
          <div className="text-center w-full truncate">
            <TextNormal className="">{user.title}</TextNormal>
          </div>
        </div>
        <div className="bg-[color:var(--primary-2)] px-8 py-6">
          <div>
            <H6>Profile Completeness:</H6>
            <div className="flex items-center gap-3 mt-2">
              <div className="relative flex-grow">
                <div className="h-1 bg-gray-200 rounded-full" />
                <div
                  className="absolute h-1 bg-[color:var(--primary-6)] rounded-full top-0 left-0 transition-all duration-300 ease-in-out"
                  style={{
                    width: `${user.profileCompletion}%`,
                  }}
                />
              </div>
              <TextSmall>{user.profileCompletion} %</TextSmall>
            </div>
          </div>
        </div>
        <div className="px-8 py-6 border-b">
          <TextLink href='"'>{user.coin} Available Coin</TextLink>
        </div>
        <div className="px-8 pt-6">
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
            <TextNormal>{user.hoursPerWeek}</TextNormal>
            <TextMuted className="text-[color:var(--gray-7)]">
              {user.contractToHire ? 'Open to contract to hire' : 'No contract-to-hire preference set'}
            </TextMuted>
          </div>
        </div>
        <div className="px-8 pt-6">
          <div className="space-y-1">
            <div className="flex items-center space-x-3">
              <H5 className="font-semibold">Profile Visibility</H5>
              <ButtonIcon
                icon={
                  <MdModeEditOutline
                    size={21}
                    onClick={() => {
                      setModal({ isOpen: true, type: MODAL_TYPE.PROFILE_VISIBILITY });
                    }}
                  />
                }
              />
            </div>
            <TextNormal>{user.profileVisibility}</TextNormal>
          </div>
        </div>
      </ContainerBorder>
      <ContainerBorder className="mt-8 !px-0">
        <div className="pb-6 border-b px-8">
          <H3>Proposals</H3>
          <TextLink href='"'>My Proposal</TextLink>
        </div>
        <div className="px-8 pt-6 text-center">
          <TextNormal>Looking for work? Browse jobs and get started on a proposal.</TextNormal>
        </div>
      </ContainerBorder>
      <ModalCommon modal={modal} setModal={setModal} profile={user as IUserProfile} />
    </div>
  );
};

export default SideBar;
