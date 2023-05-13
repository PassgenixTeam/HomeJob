import Button from '@/components/common/Button';
import Checkbox from '@/components/common/Checkbox';
import Input from '@/components/common/Input';
import MultiRadio from '@/components/common/MultiRadio';
import Radio from '@/components/common/Radio';
import H3 from '@/components/common/Text/H3';
import H6 from '@/components/common/Text/H6';
import TextNormal from '@/components/common/Text/TextNormal';
import { HOURS_PER_WEEK } from '@/stores/slices/login/enum';
import { updateProfile } from '@/stores/slices/profile/profileSlice';
import React from 'react';
import { useDispatch } from 'react-redux';

interface EditHoursPerWeekProps {
  hoursPerWeekProfile: HOURS_PER_WEEK;
  contractToHireProfile: boolean;
  onClose: () => void;
}

const EditHoursPerWeek = ({ hoursPerWeekProfile, contractToHireProfile, onClose }: EditHoursPerWeekProps) => {
  const dispatch = useDispatch();

  const [hoursPerWeek, setHoursPerWeek] = React.useState<HOURS_PER_WEEK>(hoursPerWeekProfile || 'None');
  const [contractToHire, setContractToHire] = React.useState<boolean>(contractToHireProfile);

  const handleSave = () => {
    dispatch(updateProfile({ hoursPerWeek, contractToHire }));
    onClose();
  };

  return (
    <div>
      <div className="my-10 mb-20">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-8">
            <H3>Hours per week</H3>
            <TextNormal>Knowing how much you can work helps Upwork find the right jobs for you.</TextNormal>
          </div>
          <div>
            <H6 className="text-sm font-bold mb-3">I can currently work</H6>
            <MultiRadio
              className="ml-1"
              value={hoursPerWeek}
              onClick={(e) => {
                const element = e.target as HTMLElement;
                setHoursPerWeek(element.getAttribute('value') as HOURS_PER_WEEK);
              }}
              options={[
                {
                  label: 'More than 30 hours per week',
                  value: HOURS_PER_WEEK.MORE_THAN_30H_PER_WEEK,
                },
                {
                  label: 'Less than 30 hours per week',
                  value: HOURS_PER_WEEK.LESS_THAN_30H_PER_WEEK,
                },

                {
                  label: 'As needed - open to offers',
                  value: HOURS_PER_WEEK.AS_NEED_OPEN_TO_OFFER,
                },
                {
                  label: 'None',
                  value: HOURS_PER_WEEK.NONE,
                },
              ]}
            />
          </div>
          <div>
            <H3 className="mb-8">Contract-to-hire</H3>
            <Radio
              checked={contractToHire}
              onClick={(e) => {
                setContractToHire(!contractToHire);
              }}
              square
              label={"I'm open to contract-to-hire opportunities"}
            />
            <TextNormal>This means you'll start with a contract and may later explore a full-time option</TextNormal>
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

export default EditHoursPerWeek;
