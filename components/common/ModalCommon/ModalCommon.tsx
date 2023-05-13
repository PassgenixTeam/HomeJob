import Modal from '@/components/common/Modal';
import { IModal } from '@/components/pageComponents/profile';
import EditHourlyRate from '@/components/pageComponents/profile/components/EditHourlyRate';
import EditHoursPerWeek from '@/components/pageComponents/profile/components/EditHoursPerWeek';
import EditOverview from '@/components/pageComponents/profile/components/EditOverview';
import EditProfileVisibility from '@/components/pageComponents/profile/components/EditProfileVisibility';
import EditTitle from '@/components/pageComponents/profile/components/EditTitle';
import EditVideoOverview from '@/components/pageComponents/profile/components/EditVideoOverview';
import ViewVideo from '@/components/pageComponents/profile/components/ViewVideo';
import { MODAL_TYPE } from '@/components/pageComponents/profile/enums/modal-type.enum';
import { IUser } from '@/stores/slices/login/interface';
import { IUserProfile } from '@/stores/slices/profile/interface';
import React from 'react';

interface ModalCommonProps {
  shown?: boolean;
  onClose?: () => void;
  modal: {
    isOpen: boolean;
    type: MODAL_TYPE | null;
  };
  setModal: React.Dispatch<React.SetStateAction<IModal>>;
  profile: IUserProfile;
}

const ModalCommon = ({ modal, setModal, profile }: ModalCommonProps) => {
  const title =
    modal.type === MODAL_TYPE.TITLE
      ? 'Edit your title'
      : modal.type === MODAL_TYPE.HOURLY_RATE
      ? 'Change hourly rate'
      : modal.type === MODAL_TYPE.AVATAR
      ? 'Edit your avatar'
      : modal.type === MODAL_TYPE.OVERVIEW
      ? 'Edit your overview'
      : modal.type === MODAL_TYPE.VIDEO_OVERVIEW
      ? 'Add video introduction'
      : modal.type === MODAL_TYPE.HOURS_PER_WEEK
      ? 'Availability'
      : modal.type === MODAL_TYPE.VIEW_VIDEO_OVERVIEW
      ? 'Video introduction'
      : modal.type === MODAL_TYPE.PROFILE_VISIBILITY
      ? 'Edit Profile Visibility'
      : '';

  return (
    <Modal
      isOpen={modal.isOpen}
      onClose={() =>
        setModal({
          isOpen: false,
          type: null,
        })
      }
      title={title}
      modalWidth="60%"
    >
      {modal.type === MODAL_TYPE.TITLE ? (
        <EditTitle
          titleProfile={profile.title!}
          onClose={() =>
            setModal({
              isOpen: false,
              type: null,
            })
          }
        />
      ) : modal.type === MODAL_TYPE.OVERVIEW ? (
        <EditOverview
          overviewProfile={profile.overview!}
          onClose={() =>
            setModal({
              isOpen: false,
              type: null,
            })
          }
        />
      ) : modal.type === MODAL_TYPE.HOURLY_RATE ? (
        <EditHourlyRate
          hourlyRateProfile={profile.hourlyRate!}
          onClose={() =>
            setModal({
              isOpen: false,
              type: null,
            })
          }
        />
      ) : modal.type === MODAL_TYPE.HOURS_PER_WEEK ? (
        <EditHoursPerWeek
          hoursPerWeekProfile={profile.hoursPerWeek!}
          contractToHireProfile={profile.contractToHire!}
          onClose={() =>
            setModal({
              isOpen: false,
              type: null,
            })
          }
        />
      ) : modal.type === MODAL_TYPE.VIDEO_OVERVIEW ? (
        <EditVideoOverview
          videoOverviewProfile={profile.videoOverview!}
          onClose={() =>
            setModal({
              isOpen: false,
              type: null,
            })
          }
        />
      ) : modal.type === MODAL_TYPE.VIEW_VIDEO_OVERVIEW ? (
        <ViewVideo
          url={profile.videoOverview!.url!}
          onClose={() =>
            setModal({
              isOpen: false,
              type: null,
            })
          }
        />
      ) : modal.type === MODAL_TYPE.PROFILE_VISIBILITY ? (
        <EditProfileVisibility
          profileVisibility={profile.profileVisibility!}
          onClose={() =>
            setModal({
              isOpen: false,
              type: null,
            })
          }
        />
      ) : null}
    </Modal>
  );
};

export default ModalCommon;
