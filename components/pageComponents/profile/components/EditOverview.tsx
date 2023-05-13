import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import TextLink from '@/components/common/Text/TextLink';
import TextMuted from '@/components/common/Text/TextMuted';
import TextNormal from '@/components/common/Text/TextNormal';
import TextArea from '@/components/common/TextArea/TextArea';
import TextareaField from '@/components/common/TextareaField';
import { updateProfile } from '@/stores/slices/profile/profileSlice';
import React from 'react';
import { useDispatch } from 'react-redux';

interface EditOverviewProps {
  overviewProfile: string;
  onClose: () => void;
}

const EditOverview = ({ overviewProfile, onClose }: EditOverviewProps) => {
  const dispatch = useDispatch();

  const [overview, setOverview] = React.useState<string>(overviewProfile || '');
  const [textLength, setTextLength] = React.useState<number>(5000 - overviewProfile?.length || 0);

  const handleSave = () => {
    dispatch(updateProfile({ overview }));
    onClose();
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setOverview(e.target.value);
    setTextLength(5000 - e.target.value.length);
  };

  return (
    <div>
      <div className="my-14">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-1">
            <TextNormal>Use this space to show clients you have the skills and experience they're looking for.</TextNormal>
            <ul className="list-disc m-4 mt-8">
              <li>
                <TextNormal>Describe your strengths and skills</TextNormal>
              </li>
              <li>
                <TextNormal>Highlight projects, accomplishments and education</TextNormal>
              </li>
              <li>
                <TextNormal>Keep it short and make sure it's error-free</TextNormal>
              </li>
            </ul>
            <div>
              <TextLink href="">Learn more</TextLink>
            </div>
          </div>

          <TextArea value={overview} onChange={handleOnChange} placeholder="Example: Web Application Develop" />
          <div className="mt-[-20px]">
            <TextMuted className="text-end text-xs">{textLength} characters left</TextMuted>
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

export default EditOverview;
