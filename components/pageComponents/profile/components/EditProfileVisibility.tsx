import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import MultiRadio from '@/components/common/MultiRadio';
import TextNormal from '@/components/common/Text/TextNormal';
import { PROFILE_VISIBILITY } from '@/stores/slices/login/enum';
import { updateProfile } from '@/stores/slices/profile/profileSlice';
import React from 'react';
import { useDispatch } from 'react-redux';

interface EditProfileVisibilityProps {
  profileVisibility: PROFILE_VISIBILITY;
  onClose: () => void;
}

const EditProfileVisibility = ({ profileVisibility, onClose }: EditProfileVisibilityProps) => {
  const dispatch = useDispatch();

  const [visibility, setVisibility] = React.useState<PROFILE_VISIBILITY>(profileVisibility);

  const handleSave = () => {
    dispatch(updateProfile({ profileVisibility: visibility }));
    onClose();
  };

  return (
    <div>
      <div className="my-14">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-1">
            <TextNormal className="font-bold mb-3">
              Who do you want to see your profile? Simply select an option to control your visibility and searchability. Market your profile
              when and where you want.
            </TextNormal>

            <MultiRadio
              className="ml-1"
              value={visibility}
              onClick={(e) => {
                const element = e.target as HTMLElement;
                setVisibility(element.getAttribute('value') as PROFILE_VISIBILITY);
              }}
              options={[
                {
                  label: PROFILE_VISIBILITY.PUBLIC,
                  value: PROFILE_VISIBILITY.PUBLIC,
                  textMuted: 'Your profile is visible to the general public and will show up in search engine results.',
                },
                {
                  label: PROFILE_VISIBILITY.PRIVATE,
                  value: PROFILE_VISIBILITY.PRIVATE,
                  textMuted:
                    'Your profile will not appear in search results on Upwork or search engines. It will not be visible via a direct link for non-Upwork users. Upwork users who have a direct link to your profile will see limited information. Clients you have worked with or submitted a proposal to will see your full profile.',
                },
              ]}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-3">
        <Button title="Cancel" variant="outline" className="rounded-full" onClick={onClose} />
        <Button title="Save" className="rounded-full" onClick={handleSave} />
      </div>
    </div>
  );
};

export default EditProfileVisibility;
