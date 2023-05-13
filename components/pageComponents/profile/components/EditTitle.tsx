import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import TextNormal from '@/components/common/Text/TextNormal';
import { updateProfile } from '@/stores/slices/profile/profileSlice';
import React from 'react';
import { useDispatch } from 'react-redux';

interface EditTitleProps {
  titleProfile: string;
  onClose: () => void;
}

const EditTitle = ({ titleProfile, onClose }: EditTitleProps) => {
  const dispatch = useDispatch();

  const [title, setTitle] = React.useState<string>(titleProfile || '');

  const handleSave = () => {
    dispatch(updateProfile({ title }));
    onClose();
  };

  return (
    <div>
      <div className="my-14">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-1">
            <TextNormal className="font-bold">Your title</TextNormal>
            <TextNormal className="text-sm">
              Enter a single sentence description of your professional skills/experience (e.g. Expert Web Designer with Ajax experience)
            </TextNormal>
          </div>

          <Input
            placeholder="Example: Web Application Develop"
            value={title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setTitle(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="flex justify-end gap-3">
        <Button title="Cancel" variant="outline" className="rounded-full" onClick={onClose} />
        <Button title="Save" className="rounded-full" onClick={handleSave} />
      </div>
    </div>
  );
};

export default EditTitle;
