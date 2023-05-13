import Button from '@/components/common/Button';
import Modal from '@/components/common/Modal';
import React, { useEffect } from 'react';
import proposalApi from '../../../../stores/slices/proposal/factories';
import TextNormal from '@/components/common/Text/TextNormal';
import Input from '@/components/common/Input';
import TextSmall from '@/components/common/Text/TextSmall';
import TextMuted from '@/components/common/Text/TextMuted';
import { FastField, useFormikContext } from 'formik';
import { IApplyJobForm } from '@/interfaces';
import InputMoneyField from '@/components/common/InputMoneyField';
import InputField from '@/components/common/InputDateField';

interface BiddingProps {
  jobId: string;
}

const Bidding = ({ jobId }: BiddingProps) => {
  const [isShownModal, setIsShownModal] = React.useState(false);
  const [maxBidding, setMaxBidding] = React.useState(0);
  const { values, errors, touched, setFieldValue } = useFormikContext<IApplyJobForm>();

  useEffect(() => {
    const fetchData = async () => {
      const res = await proposalApi.getTopBidding(jobId);
      const max = res.data || 0;
      setMaxBidding(max);
    };
    fetchData();
  }, [isShownModal]);

  const handleSave = () => {
    onClose();
  };

  const onClose = () => {
    setIsShownModal(false);
  };

  return (
    <>
      <Button title="Bidding" className="rounded-full h-fit py-[6px] font-medium" type="button" onClick={() => setIsShownModal(true)} />
      <Modal isOpen={isShownModal} onClose={() => setIsShownModal(false)} title={'Bidding'} modalWidth="60%">
        <div className="my-5">
          <TextNormal>
            Top bidding: <TextNormal className="!text-[color:var(--primary-8)] !font-bold text-xl">{maxBidding} VND</TextNormal>
          </TextNormal>

          <div className="my-10">
            <div className="flex items-center gap-4">
              <FastField
                component={InputField}
                name="bidding"
                placeholder="Example: 10000"
                className="md:mt-0 flex-grow"
                inputClassName="h-[40px] px-2 text-medium"
              />
              <TextNormal>VND</TextNormal>
            </div>
            <TextMuted className="mt-4 text-xs">
              Giá đấu thầu là quá trình cạnh tranh giá cả để giành được hợp đồng thực hiện một dự án. <br />
              Giá đấu thầu càng thấp thì cơ hội nhận công việc càng cao, tuy nhiên điều này còn phụ thuộc vào nhiều yếu tố khác như chất
              lượng, kinh nghiệm, thời gian hoàn thành, dịch vụ hậu mãi và uy tín của nhà thầu.
            </TextMuted>
            <TextSmall className="!text-[color:var(--primary-8)] !font-bold ">
              Ghi chú: số tiền đấu thầu phải thấp hơn số tiền đấu thầu hiện tại
            </TextSmall>
          </div>

          <div className="flex justify-end gap-3">
            <Button title="Cancel" variant="outline" className="rounded-full" size="sm" onClick={onClose} />
            <Button title="Save" className="rounded-full" size="sm" onClick={handleSave} />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Bidding;
