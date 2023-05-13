import ButtonDatePicker from '@/components/common/ButtonDatePicker';
import InputField from '@/components/common/InputDateField';
import InputMoneyField from '@/components/common/InputMoneyField';
import RadioField from '@/components/common/RadioField';
import TextLink from '@/components/common/Text/TextLink';
import { IApplyJobForm, IOfferForm, PAID_OPTION } from '@/interfaces';
import { useAppSelector } from '@/stores/hooks';
import { FastField, FieldArray, useFormikContext } from 'formik';
import React, { useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import { AiFillQuestionCircle, AiOutlinePlus } from 'react-icons/ai';
import { FaPen } from 'react-icons/fa';
import { HiChevronDown, HiOutlineClock } from 'react-icons/hi';
import { IoClose } from 'react-icons/io5';
import { MdOutlineSell } from 'react-icons/md';

export interface ContractTermProps {}

export default function ContractTerm(props: ContractTermProps) {
  const proposalInfo = useAppSelector((state) => state.proposal);
  const { values, errors, touched, setFieldValue } = useFormikContext<IOfferForm>();
  const isShowError = errors.milestones && touched.milestones;
  const [showEditPayOption, setShowEditPayOption] = useState<boolean>(false);
  const [showEditAmount, setShowEditAmount] = useState<boolean>(false);
  return (
    <div className="w-full  border rounded-xl text-black">
      <h6 className="text-xl font-semibold mb-4 px-8 pt-6">Contract Terms</h6>
      <div className="px-8 py-6">
        <div className="py-3 flex items-center space-x-1">
          <TextLink>WorkFromHome Payment Protection.</TextLink>
          <p>Only pay for the work you authorize</p>
        </div>
        <div className="font-medium pb-3">
          <div className="flex items-center space-x-2 py-1">
            <p>Payment Option</p>
            <AiFillQuestionCircle />
          </div>
          <div className="flex items-center space-x-2 py-1">
            {showEditPayOption ? (
              <div className="flex justify-center items-center space-x-6 my-3">
                <div
                  className={`w-[260px] transition-all hover:cursor-pointer h-fit rounded-md p-2 border-[2px] 
              border-[color:var(--primary-7)] ${values.paymentOption === PAID_OPTION.HOUR && 'bg-[color:var(--primary-1)]'}`}
                  onClick={() => setFieldValue('paymentOption', PAID_OPTION.HOUR)}
                >
                  <div className="flex justify-between items-center">
                    <HiOutlineClock size={24} className="ml-4 mt-3" />
                    <FastField
                      component={RadioField}
                      name="paymentOption"
                      value={values.paymentOption}
                      label=""
                      checked={values.paymentOption === PAID_OPTION.HOUR}
                      custom
                    />
                  </div>
                  <div>
                    <p className="text-2xl font-semibold ml-4 mt-4">Pay by the hour</p>
                    <p className="text-sm text-[color:var(--gray-7)] ml-4 mb-3 mt-2">Pay for the number of hours worked on a project</p>
                  </div>
                </div>
                <div
                  className={`w-[260px] transition-all hover:cursor-pointer h-fit rounded-md 
              p-2 ${
                values.paymentOption === PAID_OPTION.FIXED_PRICE && 'bg-[color:var(--primary-1)]'
              } border-[2px] border-[color:var(--primary-7)]`}
                  onClick={() => setFieldValue('paymentOption', PAID_OPTION.FIXED_PRICE)}
                >
                  <div className="flex justify-between items-center">
                    <MdOutlineSell size={22} className="ml-4 mt-3" />
                    <FastField
                      component={RadioField}
                      name="paymentOption"
                      value={values.paymentOption}
                      label=""
                      checked={values.paymentOption === PAID_OPTION.FIXED_PRICE}
                      custom
                    />
                  </div>
                  <div>
                    <p className="text-2xl font-semibold ml-4 mt-4">Pay a fixed price</p>
                    <p className="text-sm text-[color:var(--gray-7)] ml-4 mb-3 mt-2">Pay as project milestones are completed</p>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <p>Fixed-price</p>
                <FaPen size={14} className="hover:cursor-pointer" onClick={() => setShowEditPayOption(true)} />
              </>
            )}
          </div>
        </div>
        <div className="pt-2">
          <div className="font-medium py-1">
            <p>Pay a fixed price for your project</p>
          </div>
          {showEditAmount ? (
            <FastField
              component={InputMoneyField}
              name="amount"
              placeholder=""
              className="md:mt-0 w-[200px]"
              inputClassName="h-[40px] px-2 text-medium"
            />
          ) : (
            <div className="flex items-center space-x-2 font-medium py-1">
              <p>${proposalInfo.detail?.amount.toFixed(2)}</p>
              <FaPen size={14} className="hover:cursor-pointer" onClick={() => setShowEditAmount(true)} />
            </div>
          )}

          <span className="text-sm text-[color:var(--gray-7)]">
            This is the price you and {proposalInfo?.detail?.user?.firstName + ' ' + proposalInfo?.detail?.user?.lastName} have agreed upon
          </span>
        </div>
        <div>
          <div className="py-5">
            <p className="py-2 font-medium">Deposit funds into Escrow</p>
            <span className="py-2 text-sm text-[color:var(--gray-7)]">
              Escrow a neutral holding place that projects your deposit until work is approved
            </span>
          </div>
          <div>
            <FastField
              component={RadioField}
              name="deposit"
              value={values.deposit}
              checked={values.deposit === 'all'}
              custom
              label={`Deposit $${proposalInfo.detail?.amount} for the whole project`}
              onClick={() => {
                setFieldValue('deposit', 'all');
              }}
            />
            <FastField
              component={RadioField}
              name="deposit"
              value={values.deposit}
              checked={values.deposit === 'first_milestone'}
              custom
              label="Deposit a lesser amount to cover the first milestone"
              onClick={() => {
                setFieldValue('deposit', 'first_milestone');
              }}
            />
            {values.deposit === 'first_milestone' && (
              <>
                <div className="pb-5 pt-2">
                  <h6 className="font-medium py-2">Project Milestones</h6>
                  <span className="text-sm text-[color:var(--gray-7)]">
                    Add project milestones and pay in installments as each milestone is completed to your satisfaction. Due dates will be
                    set in Coordinated Universal Time (UTC).
                  </span>
                </div>
                <div className="w-full">
                  <FieldArray
                    name="milestones"
                    render={(arrayHelpers) => (
                      <div className="space-y-6 mb-5">
                        {values.milestones?.map((item, index) => (
                          <div className="flex items-center w-full space-x-3" key={index}>
                            <span className="mt-6 font-medium">{index + 1}</span>
                            <FastField
                              component={InputField}
                              name={`milestones[${index}].description`}
                              title="Description"
                              placeholder=""
                              className="mt-4 md:mt-0 basis-2/4"
                              inputClassName="h-[40px] px-2 text-medium"
                              arrayError={
                                isShowError &&
                                (errors.milestones
                                  ? errors.milestones[index]
                                    ? Object.keys(errors.milestones[index]).indexOf('description') !== -1
                                      ? //@ts-ignore
                                        errors.milestones[index].description
                                      : false
                                    : false
                                  : false)
                              }
                            />
                            <FastField
                              component={InputMoneyField}
                              name={`milestones[${index}].amount`}
                              title="Amount"
                              placeholder=""
                              className="mt-4 md:mt-0 basis-1/4"
                              inputClassName="h-[40px] px-2 text-medium"
                              arrayError={
                                isShowError &&
                                (errors.milestones
                                  ? errors.milestones[index]
                                    ? Object.keys(errors.milestones[index]).indexOf('amount') !== -1
                                      ? //@ts-ignore
                                        errors.milestones[index].amount
                                      : false
                                    : false
                                  : false)
                              }
                            />
                            <div className="basis-1/4">
                              <ReactDatePicker
                                selected={new Date(values.milestones[index].dueDate)}
                                onChange={(date: Date) => {
                                  setFieldValue(`milestones[${index}].dueDate`, date);
                                }}
                                dateFormat="yyyy.MM.dd"
                                title="Due date"
                                customInput={<ButtonDatePicker />}
                              />
                            </div>
                            {index > 0 ? (
                              <div
                                className="w-[20px] h-full mt-6 flex justify-center items-center 
                              text-[color:var(--red-err)] hover:cursor-pointer"
                                onClick={() => {
                                  arrayHelpers.remove(index);
                                }}
                              >
                                <IoClose size={24} />
                              </div>
                            ) : (
                              <div className="w-[20px]"></div>
                            )}
                          </div>
                        ))}
                        <TextLink
                          icon={<AiOutlinePlus size={16} />}
                          onClick={() => {
                            arrayHelpers.push({
                              description: '',
                              dueDate: new Date().toISOString(),
                              amount: 0,
                            });
                          }}
                        >
                          Add milestone
                        </TextLink>
                      </div>
                    )}
                  />
                </div>
              </>
            )}
          </div>
          <div className="w-[250px] pt-4 pb-4">
            <ReactDatePicker
              selected={values.dueDate}
              onChange={(date: Date) => {
                setFieldValue(`dueDate`, date);
              }}
              dateFormat="yyyy.MM.dd"
              title="Due date (Optional)"
              placeholderText="yyyy.mm.dd"
              customInput={<ButtonDatePicker />}
            />
          </div>
        </div>
      </div>
      <div
        className="border-t-[1px] border-t-[color:var(--gray-5)] px-8
       py-4 font-medium flex justify-between items-center hover:cursor-pointer"
      >
        <p>How do fixed-price contracts work?</p>
        <HiChevronDown />
      </div>
    </div>
  );
}
