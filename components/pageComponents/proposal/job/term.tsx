import InputField from '@/components/common/InputField';
import InputMoneyField from '@/components/common/InputMoneyField';
import RadioField from '@/components/common/RadioField';
import SelectField from '@/components/common/SelectField';
import TextLink from '@/components/common/Text/TextLink';
import { IApplyJobForm, IMilestone, PAID_TYPE, PROJECT_LENGTH } from '@/interfaces';
import { FastField, FieldArray, useFormikContext } from 'formik';
import Image from 'next/image';
import { AiOutlinePlus } from 'react-icons/ai';
import { BsCurrencyDollar } from 'react-icons/bs';
import { IoClose } from 'react-icons/io5';
import ReactDatePicker from 'react-datepicker';
import ButtonDatePicker from '@/components/common/ButtonDatePicker';
import { useEffect, useState } from 'react';
import proposalApi from '../../../../stores/slices/proposal/factories';
import { useRouter } from 'next/router';
import TextMuted from '@/components/common/Text/TextMuted';
import H4 from '@/components/common/Text/H4';

export interface TermsProps {}

export default function Terms(props: TermsProps) {
  const router = useRouter();
  const { values, errors, touched, setFieldValue } = useFormikContext<IApplyJobForm>();
  const projectTime = Object.values(PROJECT_LENGTH).map((item) => ({ value: item, label: item.replaceAll('_', ' ') }));
  const isShowError = errors.milestones && touched.milestones;

  const [topBidding, setTopBidding] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await proposalApi.getTopBidding(router.query.jid as string);
      setTopBidding(res.data);
    };

    fetchData();
  }, []);

  return (
    <>
      <section className="px-8 py-4 border rounded-2xl">
        <h6 className="text-2xl font-medium mb-12">Thông tin đấu thầu</h6>
        <div>
          <div className="flex gap-2">
            <H4>Giá thầu hiện tại: </H4>
            <H4 className="text-[color:var(--primary-6)]">{topBidding} Triệu VND</H4>
          </div>
          <h6 className="font-medium py-2">Tổng chi phí xây dựng và hoàng thiện dự kiến</h6>
          <div className="mb-8 mt-2 flex items-center gap-6">
            <FastField
              component={InputField}
              name="estimateBudget"
              title=""
              type="number"
              className="mt-4 md:mt-0 w-fit"
              inputClassName="h-[40px] text-medium w-[200px]"
              height="40px"
              placeholder={values.estimateBudget}
              value={values.estimateBudget}
            />
            <p className="font-medium text-base pb-2">triệu VND</p>
          </div>
          <h6 className="font-medium py-2">Số ngày dự kiến hoàng thành</h6>
          <div className="mb-8 mt-2 flex items-center gap-6">
            <FastField
              component={InputField}
              name="estimatedTime"
              title=""
              type="number"
              className="mt-4 md:mt-0 w-fit"
              inputClassName="h-[40px] text-medium w-[200px]"
              height="40px"
              placeholder={values.estimatedTime}
              value={values.estimatedTime}
            />
            <p className="font-medium text-base pb-2">Ngày</p>
          </div>
          <h6 className="font-medium py-2">Số nhân công dự kiến</h6>
          <div className="mb-8 mt-2 flex items-center gap-6">
            <FastField
              component={InputField}
              name="estimatedLabor"
              title=""
              className="mt-4 md:mt-0"
              inputClassName="h-[40px] text-medium w-[200px]"
              height="40px"
              type="number"
              placeholder={values.estimatedLabor}
              value={values.estimatedLabor}
            />
            <p className="font-medium text-base pb-2">Nhân công</p>
          </div>
        </div>
      </section>
    </>
  );
}
