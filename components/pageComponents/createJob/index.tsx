import React, { useEffect, useRef, useState } from 'react';
import { CreateStep } from './createStep';
import { FastField, Field, Form, Formik } from 'formik';
import { EXPERIENCE_LEVEL, ICreateJobForm, JOB_STATUS, PROJECT_LENGTH, SCOPE_TYPE } from '@/interfaces';
import { CreateJobSchema } from '@/validations/createJobSchema';
import InputField from '@/components/common/InputField';
import Button from '@/components/common/Button';
import SelectField from '@/components/common/SelectField';
import { chartData, skillList } from '@/utils/common';
import { BsBookmarkStarFill, BsCurrencyDollar, BsPlus } from 'react-icons/bs';
import { MdOutlineSell } from 'react-icons/md';
import { HiOutlineClock } from 'react-icons/hi';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import RadioField from '@/components/common/RadioField';
import TextareaField from '@/components/common/TextareaField';
import _ from 'lodash';
import InputFileField from '@/components/common/InputFileField';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import { getFileLink, getSkillList, postJobs } from '@/stores/slices/jobs/jobsSlide';
import { ISkills } from '@/stores/slices/jobs/interface';
import Loading from '@/components/common/Loading';
import TextNormal from '@/components/common/Text/TextNormal';
import H6 from '@/components/common/Text/H6';
import ContainerBorder from '@/components/layouts/ContainerBorder';
import Container from '@/components/layouts/Container';

export interface CreateJobProps {}

export default function CreateJob(props: CreateJobProps) {
  const [step, setStep] = useState<number>(1);
  const [imageUrl, setImageUrl] = useState<any>([]);
  const dispatch = useAppDispatch();
  const jobsInfo = useAppSelector((state) => state.jobs);
  const initialValues: ICreateJobForm = {
    title: '',
    skills: [],
    scope: {},
    // budget: {
    //   type: 'Project budget',
    //   maxBudget: 0,
    //   from: 0,
    //   to: 0,
    // },
    budget: 0,
    describe: '',
    attachFile: null,
    estimate: 0,
  };
  const step1 = useRef<HTMLDivElement>(null);
  const step2 = useRef<HTMLDivElement>(null);
  const step3 = useRef<HTMLDivElement>(null);
  const step4 = useRef<HTMLDivElement>(null);
  const step5 = useRef<HTMLDivElement>(null);
  const handleNextStep = (stepIndex: number) => {
    setStep(stepIndex);
  };

  const handleSubmit = (values: ICreateJobForm) => {
    const formData = {
      title: values.title,
      description: values.describe,
      attachments: values.attachFile,
      status: JOB_STATUS.PUBLIC,
      estimate: values.estimate,
      budget: values.budget,
    };
    dispatch({
      //@ts-ignore
      type: postJobs(formData).type,
      payload: formData,
    });
  };

  const handleDraft = (values: ICreateJobForm) => {
    const formData = {
      title: values.title,
      description: values.describe,
      budget: values.budget,
      attachments: jobsInfo.fileUrl.map((item) => item.url),
      status: JOB_STATUS.DRAFT,
      estimate: values.estimate,
    };
    dispatch({
      type: postJobs(formData).type,
      payload: formData,
    });
  };

  // useEffect(() => {
  //   dispatch(getSkillList());
  // }, []);
  // useEffect(() => {
  //   if (jobsInfo.skillList?.length !== 0) {
  //     setSkills(jobsInfo.skillList);
  //   }
  // }, [jobsInfo.skillList]);

  return (
    <Container>
      <ContainerBorder>
        <div className="w-full flex justify-center relative">
          {jobsInfo.isLoading && (
            <div className="absolute w-full h-full z-50 flex items-center justify-center bg-[color:var(--primary-1)] opacity-50">
              <Loading size={34} color="#40a9ff" />
            </div>
          )}
          <div className="w-full max-w-[1440px] px-8">
            <h1 className="text-4xl font-bold text-center py-3 my-6 text-[color:var(--gray-9)]">Tạo công việc</h1>
            <Formik
              enableReinitialize
              initialValues={initialValues}
              onSubmit={(values) => {
                handleSubmit(values);
              }}
              validationSchema={CreateJobSchema}
            >
              {(formikProps) => {
                const { errors, touched, values, setFieldValue } = formikProps;
                console.log(touched);

                return (
                  <Form>
                    <div className="text-[color:var(--primary-10)]">
                      <div className="py-6">
                        <p className="font-medium text-xl pb-2">Viết tiêu đề cho bài đăng công việc của bạn</p>
                        <FastField
                          component={InputField}
                          name="title"
                          title=""
                          placeholder=""
                          className="mt-4 md:mt-0"
                          inputClassName="h-[40px] px-2 text-medium"
                        />
                        <div className="py-2">
                          <p className="font-medium">Ví dụ tiêu đề</p>
                          <div className="px-3">
                            <div className="flex items-center">
                              <div className="h-[4px] w-[4px] rounded-full bg-[color:var(--primary-7)] mr-2"></div>
                              <p>
                                Tìm kiếm một người có kinh nghiệm trong lĩnh vực xây dựng để giúp xây dựng và hoàn thành các dự án xây dựng
                              </p>
                            </div>
                            <div className="flex items-center">
                              <div className="h-[4px] w-[4px] rounded-full bg-[color:var(--primary-7)] mr-2"></div>
                              <p>
                                Tìm kiếm một kỹ sư xây dựng có kinh nghiệm để giám sát các công trình xây dựng và đảm bảo chất lượng công
                                việc.
                              </p>
                            </div>
                            <div className="flex items-center">
                              <div className="h-[4px] w-[4px] rounded-full bg-[color:var(--primary-7)] mr-2"></div>
                              <p>
                                Tìm kiếm một thợ mộc có kinh nghiệm trong việc sản xuất và lắp đặt các công trình bằng gỗ, bao gồm cửa, sàn,
                                bậc thang, và các bộ phận khác.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-[color:var(--primary-10)]">
                      <p className="font-nomal">Xem xét quy mô dự án của bạn và thời gian cần thiết</p>
                      <div className="py-6">
                        <p className="font-medium text-xl pb-2">Sô ngày dự tính hoàn thành công việc</p>
                        <div className="flex gap-4 items-center">
                          <FastField
                            inputClassName="text-right px-2 text-medium"
                            component={InputField}
                            name="estimate"
                            value={values.estimate}
                            type="number"
                            label=""
                            custom
                          />
                          <p className="font-medium text-lg pb-2">Ngày</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <p className="font-medium text-xl pb-2">Tổng chi phí dự kiến (VND)</p>
                      <div className="flex items-center gap-4">
                        <FastField
                          component={InputField}
                          name="budget"
                          title=""
                          placeholder="0"
                          className="w-[200px]"
                          type="number"
                          inputClassName="h-[40px] px-2 text-medium text-right"
                        />
                        <p className="font-medium text-lg pb-2">triệu VND</p>
                      </div>
                    </div>
                    <div className="text-[color:var(--primary-10)]">
                      <div className="py-4">
                        <p className="font-medium text-xl pb-2">Mô tả công việc</p>
                        <FastField
                          component={TextareaField}
                          name="describe"
                          rows={8}
                          placeholder="Already have a description? Paste it here!"
                        />
                      </div>
                      <div className="py-4">
                        <FastField
                          component={InputFileField}
                          name="attachFile"
                          title=""
                          placeholder=""
                          className="mt-4 md:mt-0"
                          inputClassName="px-2"
                          onChange={(e: FileList) => {
                            const fileLists = [];
                            //@ts-ignore
                            for (const file of e) {
                              if (file.type === 'image/png') {
                                fileLists.push(URL.createObjectURL(file));
                              }
                            }
                            setImageUrl(fileLists);
                          }}
                        />
                        <div className="flex space-x-3">
                          {imageUrl?.map((item: any, index: number) => (
                            <img key={index} src={item} alt="Work from home" className="w-[100px] h-[100px] object-cover" />
                          ))}
                        </div>
                        <p className="text-[color:var(--gray-7)]">Kích thước tệp tối đa: 100 MB</p>
                      </div>
                      <div className="flex justify-end space-x-6">
                        <Button
                          title="Lưu bản nháp"
                          className=" rounded-full px-8"
                          disabled={!_.isEmpty(errors) || _.isEmpty(touched)}
                          type="button"
                          variant="outline"
                          onClick={() => handleDraft(values)}
                        />
                        <Button
                          title="Đăng tuyển công khai"
                          className=" rounded-full px-8"
                          disabled={!_.isEmpty(errors) || _.isEmpty(touched)}
                          type="submit"
                        />
                      </div>
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </div>
        </div>
      </ContainerBorder>
    </Container>
  );
}
