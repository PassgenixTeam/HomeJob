import InputField from "@/components/common/InputField";
import InputMoneyField from "@/components/common/InputMoneyField";
import RadioField from "@/components/common/RadioField";
import SelectField from "@/components/common/SelectField";
import TextLink from "@/components/common/Text/TextLink";
import { IApplyJobForm, IMilestone, PAID_TYPE, PROJECT_LENGTH } from "@/interfaces";
import { FastField, FieldArray, useFormikContext } from "formik";
import Image from "next/image";
import { AiOutlinePlus } from "react-icons/ai";
import { BsCurrencyDollar } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import ReactDatePicker from "react-datepicker";
import ButtonDatePicker from "@/components/common/ButtonDatePicker";
export interface TermsProps {}

export default function Terms(props: TermsProps) {
  const { values, errors, touched, setFieldValue } =
    useFormikContext<IApplyJobForm>();
  const projectTime =Object.values(PROJECT_LENGTH).map(item=>( {value:item,label:item.replaceAll("_"," ")}))
  const isShowError = errors.milestones && touched.milestones;

  return (
    <>
      <section className="px-8 py-4 border rounded-2xl">
        <h6 className="text-2xl font-medium mb-12">Terms</h6>
        <div>
          <h6 className="font-medium py-2">How do you want to be paid?</h6>
          <div>
            <FastField
              component={RadioField}
              name="paidType"
              value={values.paidType}
              label="By milestone"
              checked={values.paidType === PAID_TYPE.MILESTONE}
              description="Divide the project into smaller segments, called milestones. 
              You'll be paid for milestones as they are completed and approved."
              custom
              onClick={() => {
                setFieldValue("paidType", PAID_TYPE.MILESTONE);
              }}
            />
            <FastField
              component={RadioField}
              name="paidType"
              value={values.paidType}
              label="By Project"
              checked={values.paidType === PAID_TYPE.PROJECT}
              description="Get your entire payment at the end, when all work has been delivered."
              custom
              onClick={() => {
                setFieldValue("paidType", PAID_TYPE.PROJECT);
              }}
            />
          </div>
          <div>
            {values.paidType === PAID_TYPE.MILESTONE && (
              <>
                <h6 className="font-medium py-2">
                  How many milestones do you want to include?
                </h6>
                <div className="w-full">
                  <FieldArray
                    name="milestones"
                    render={(arrayHelpers) => (
                      <div className="space-y-6 mb-5">
                        {values.milestones.map((item, index) => (
                          <div
                            className="flex items-center w-full space-x-3"
                            key={index}
                          >
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
                                    ? Object.keys(errors.milestones[index]).indexOf("description") !==
                                      -1
                                      //@ts-ignore
                                      ? errors.milestones[index].description
                                      : false
                                    : false
                                  : false)
                              }
                            />
                            {/* <FastField
                              component={InputField}
                              name={`milestones[${index}].dueDate`}
                              title="Due date"
                              placeholder=""
                              className="mt-4 md:mt-0 basis-1/4"
                              inputClassName="h-[40px] px-2 text-medium"
                              arrayError={
                                isShowError &&
                                (errors.milestones
                                  ? errors.milestones[index]
                                    ? Object.keys(errors.milestones[index]).indexOf("dueDate") !==
                                      -1
                                      //@ts-ignore
                                      ? errors.milestones[index].dueDate
                                      : false
                                    : false
                                  : false)
                              }
                            /> */}
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
                                    ? Object.keys(errors.milestones[index]).indexOf("amount") !==
                                      -1
                                      //@ts-ignore
                                      ? errors.milestones[index].amount
                                      : false
                                    : false
                                  : false)
                              }
                            />
                            <div className="basis-1/4">
                              <ReactDatePicker
                                selected={new Date(values.milestones[index].dueDate)}
                                onChange={(date: Date) => {
                                  setFieldValue(`milestones[${index}].dueDate`,date)
                                }}
                                dateFormat="yyyy.MM.dd"
                                title="Due date"
                                customInput={<ButtonDatePicker/>}
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
                              description: "",
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
            <div className="border-t-[1px] pt-3 flex justify-between items-center space-x-8">
              <div className="basis-3/4">
                {values.paidType === PAID_TYPE.MILESTONE ? (
                  <div>
                    <div className="flex justify-between pb-8 border-b-[1px]">
                      <div>
                        <h6 className="font-medium py-2">
                          Total price of project
                        </h6>
                        <p className="text-[color:var(--gray-7)]">
                          This includes all milestones, and is the amount your
                          client will see
                        </p>
                      </div>
                      <p className="py-2">
                        $
                        {values.milestones
                          .reduce((total, current) => total + Number(current.amount), 0)
                          .toFixed(2)}
                      </p>
                    </div>
                    <div className="flex justify-between pb-8 border-b-[1px]">
                      <div>
                        <h6 className="font-medium py-2">
                          WorkFromHome Service Free
                        </h6>
                      </div>
                      <p className="py-2">${(values.milestones
                          .reduce((total, current) => total + Number(current.amount), 0) * 0.2)
                          .toFixed(2)}</p>
                    </div>
                    <div className="flex justify-between pb-8">
                      <div>
                        <h6 className="font-medium py-2">You'll Receive</h6>
                        <p className="text-[color:var(--gray-7)]">
                          Your estimated payment, after service fees
                        </p>
                      </div>
                      <p className="py-2">${(values.milestones
                          .reduce((total, current) => total + Number(current.amount), 0)*0.8)
                          .toFixed(2)}</p>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h6 className="font-medium py-2">
                      What is the full amount you'd like to bid for this job?
                    </h6>
                    <div>
                      <div className="flex justify-between items-center pb-8 border-b-[1px]">
                        <div>
                          <h6 className="font-medium py-2">Bid</h6>
                          <p className="text-[color:var(--gray-7)]">
                            Total amount the client will see on your proposal
                          </p>
                        </div>
                        <div className="basis-2/5">
                          <FastField
                            component={InputMoneyField}
                            name="bid"
                            placeholder=""
                            className="md:mt-0 "
                            inputClassName="h-[40px] px-2 text-medium"
                            onChange={(e: number) => {
                              setFieldValue("amount", (e * 0.8).toFixed(2));
                            }}
                          />
                        </div>
                      </div>
                      <div className="flex justify-between items-center pb-8 border-b-[1px]">
                        <div>
                          <h6 className="font-medium py-2">
                            WorkFromHome Service Free
                          </h6>
                        </div>
                        <div className="basis-2/5 mt-3 flex justify-between items-center text-[color:var(--gray-7)]">
                          <BsCurrencyDollar />
                          <div className="mr-6">
                            {values.bid !== 0 && "-"}
                            {values.bid && (values.bid * 0.2).toFixed(2)}
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center pb-8">
                        <div>
                          <h6 className="font-medium py-2">You'll Receive</h6>
                          <p className="text-[color:var(--gray-7)]">
                            Your estimated payment, after service fees
                          </p>
                        </div>
                        <div className="basis-2/5">
                          <FastField
                            component={InputMoneyField}
                            name="amount"
                            placeholder=""
                            className="md:mt-0 basis-1/4"
                            inputClassName="h-[40px] px-2 text-medium"
                            onChange={(e: number) => {
                              setFieldValue("bid", (e * 1.2).toFixed(2));
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="basis-1/4 flex flex-col items-center space-y-3">
                <Image
                  src="/images/encrypted.png"
                  alt="Work from Home fixed-price"
                  width={110}
                  height={110}
                />
                <p className="text-center text-[color:var(--gray-7)]">
                  Includes WorkFromHome Fixed-Price Protection
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="px-8 py-4 border rounded-2xl">
        <div>
          <h6 className="font-medium py-2">How long will this project take?</h6>
          <div className="w-[30%] mb-8 mt-2">
            <FastField
              component={SelectField}
              name="projectLong"
              title=""
              className="mt-4 md:mt-0"
              inputClassName="h-[40px] text-medium"
              height="40px"
              placeholder={
                projectTime.find(
                  (item) => item.value === values.projectLong
                )?.label
              }
              options={projectTime}
            />
          </div>

        </div>
      </section>
                          
    </>
  );
}
