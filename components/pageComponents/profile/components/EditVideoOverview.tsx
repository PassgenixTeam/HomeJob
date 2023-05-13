import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import Select from '@/components/common/Select';
import H5 from '@/components/common/Text/H5';
import H6 from '@/components/common/Text/H6';
import TextLink from '@/components/common/Text/TextLink';
import TextNormal from '@/components/common/Text/TextNormal';
import { updateProfile } from '@/stores/slices/profile/profileSlice';
import React from 'react';
import { useDispatch } from 'react-redux';

const options = [
  { value: 'Me talking about my skills and experience', label: 'Me talking about my skills and experience' },
  { value: 'Visual samples of my work', label: 'Visual samples of my work' },
  { value: 'Something else', label: 'Something else' },
];

interface EditVideoOverviewProps {
  videoOverviewProfile: {
    url: string | null;
    typeVideo: string | null;
  };
  onClose: () => void;
}

const EditVideoOverview = ({ videoOverviewProfile, onClose }: EditVideoOverviewProps) => {
  const dispatch = useDispatch();

  const [videoOverview, setVideoOverview] = React.useState<{
    url: string | null;
    typeVideo: string | null;
  }>(
    videoOverviewProfile || {
      url: '',
      typeVideo: '',
    }
  );

  const handleSave = () => {
    dispatch(updateProfile({ videoOverview }));
    onClose();
  };

  return (
    <div>
      <div className="my-14">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <H6>Link to your YouTube video</H6>

            <Input
              placeholder="Ex: https://www.youtube.com/watch?v=dQw4w9WgXcQ"
              value={videoOverview.url || ''}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setVideoOverview({
                  ...videoOverview,
                  url: e.target.value,
                });
              }}
            />
            <TextLink href="#">Does your video meet Upwork&apos;s guidelines?</TextLink>
          </div>

          <div>
            <H6>What type of video is this?</H6>
            <Select
              options={options}
              defaultValue={options.find((option) => option.value === videoOverview.typeVideo)}
              placeholder="What type of video is this?"
              onChange={(e: any) => {
                setVideoOverview({
                  ...videoOverview,
                  typeVideo: e.value,
                });
              }}
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

export default EditVideoOverview;
