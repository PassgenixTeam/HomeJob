import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import H6 from '@/components/common/Text/H6';
import TextMuted from '@/components/common/Text/TextMuted';
import TextNormal from '@/components/common/Text/TextNormal';
import TextSmall from '@/components/common/Text/TextSmall';
import { updateProfile } from '@/stores/slices/profile/profileSlice';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Tooltip } from 'react-tooltip';

interface EditHourlyRateProps {
  hourlyRateProfile: number;
  onClose: () => void;
}

const EditHourlyRate = ({ hourlyRateProfile, onClose }: EditHourlyRateProps) => {
  const dispatch = useDispatch();

  const [hourlyRate, setHourlyRate] = React.useState<string>(hourlyRateProfile.toFixed(2) || (0).toFixed(2));
  const [fee, setFee] = React.useState<string>((-(hourlyRateProfile * 0.2)).toFixed(2) || (0).toFixed(2));
  const [receive, setReceive] = React.useState<string>((hourlyRateProfile - hourlyRateProfile * 0.2).toFixed(2) || (0).toFixed(2));

  const handleSave = () => {
    dispatch(updateProfile({ hourlyRate: Number(hourlyRate) }));
    onClose();
  };

  const handleReceive = (newReceive: any) => {
    if (isNaN(parseFloat(newReceive))) {
      return setReceive(newReceive.toString());
    }

    let _receive = Number(newReceive || receive);
    let _hourlyRate = _receive / 0.8;

    if (_receive <= 2.4) {
      _receive = 2.4;
      _hourlyRate = 3;
    }

    if (_receive >= 999 * 0.8) {
      _receive = 999 * 0.8;
      _hourlyRate = 999;
    }

    setHourlyRate(_hourlyRate.toFixed(2));
    setFee((-_hourlyRate * 0.2).toFixed(2));
    setReceive(_receive.toFixed(2));
  };

  const handleHourlyRate = (newHourlyRate: any) => {
    if (isNaN(parseFloat(newHourlyRate))) {
      return setHourlyRate(newHourlyRate.toString());
    }

    let _hourlyRate = Number(newHourlyRate || hourlyRate);
    let _fee = _hourlyRate * 0.2;

    if (_hourlyRate <= 3) {
      _fee = 3 * 0.2;
      _hourlyRate = 3;
    }

    if (_hourlyRate >= 1000) {
      _fee = 999 * 0.2;
      _hourlyRate = 999;
    }

    setHourlyRate(_hourlyRate.toFixed(2));
    setFee((-_fee).toFixed(2));
    setReceive((_hourlyRate - _fee).toFixed(2));
  };

  return (
    <div>
      <div className="my-14">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <TextNormal className="font-bold">Please note that your new hourly rate will only apply to new contracts.</TextNormal>
            <TextNormal className="text-sm">
              The Upwork Service Fee is 20% when you begin a contract with a new client. <br />
              Once you bill over $500 with your client, the fee will be 10%.
            </TextNormal>
            <TextMuted>Your profile rate: $5.00/hr</TextMuted>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <H6>Hourly Rate</H6>
              <TextSmall>Total amount the client will see</TextSmall>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Input
                  inputClassName="text-right"
                  placeholder="Example: Web Application Develop"
                  value={hourlyRate.toString()}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setHourlyRate(e.target.value);
                  }}
                  onBlur={(e) => handleHourlyRate(e.target.value)}
                />
                <span className="absolute top-1/2 left-3 transform -translate-y-1/2">$</span>
              </div>
              <TextNormal className="">/hr</TextNormal>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <H6>20% Upwork Service Fee</H6>
              <TextSmall> </TextSmall>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Input
                  disabled
                  inputClassName="text-right bg-[color:var(--primary-2)]"
                  placeholder="Example: Web Application Develop"
                  value={fee.toString()}
                  onChange={(e) => null}
                />
                <span className="absolute top-1/2 left-3 transform -translate-y-1/2">$</span>
              </div>
              <TextNormal className="">/hr</TextNormal>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <H6>You'll Receive</H6>
              <TextSmall>The estimated amount you'll receive after service fees</TextSmall>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Input
                  inputClassName="text-right"
                  placeholder="Example: Web Application Develop"
                  value={receive.toString()}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setReceive(e.target.value);
                  }}
                  onBlur={(e) => handleReceive(e.target.value)}
                />
                <span className="absolute top-1/2 left-3 transform -translate-y-1/2">$</span>
              </div>
              <TextNormal className="">/hr</TextNormal>
            </div>
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

export default EditHourlyRate;
