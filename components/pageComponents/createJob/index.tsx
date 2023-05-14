import React, { useEffect, useRef, useState } from "react";
import { CreateStep } from "./createStep";
import { FastField, Field, Form, Formik } from "formik";
import { EXPERIENCE_LEVEL, ICreateJobForm, JOB_STATUS, PROJECT_LENGTH, SCOPE_TYPE } from "@/interfaces";
import { CreateJobSchema } from "@/validations/createJobSchema";
import InputField from "@/components/common/InputField";
import Button from "@/components/common/Button";
import SelectField from "@/components/common/SelectField";
import { chartData, skillList } from "@/utils/common";
import { BsBookmarkStarFill, BsCurrencyDollar, BsPlus } from "react-icons/bs";
import { MdOutlineSell } from "react-icons/md";
import { HiOutlineClock } from "react-icons/hi";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import RadioField from "@/components/common/RadioField";
import TextareaField from "@/components/common/TextareaField";
import _ from "lodash";
import InputFileField from "@/components/common/InputFileField";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { getFileLink, getSkillList, postJobs } from "@/stores/slices/jobs/jobsSlide";
import { ISkills } from "@/stores/slices/jobs/interface";
import Loading from "@/components/common/Loading";
import TextNormal from "@/components/common/Text/TextNormal";
import H6 from "@/components/common/Text/H6";
import ContainerBorder from "@/components/layouts/ContainerBorder";
import Container from "@/components/layouts/Container";
import { useMutation } from "@tanstack/react-query";
import { euenoCreateProject, euenoUploadFile } from "@/orai/eueno";
import { toast } from "react-toastify";

export interface CreateJobProps {}

export default function CreateJob(props: CreateJobProps) {
  const [step, setStep] = useState<number>(1);
  const [imageUrl, setImageUrl] = useState<any>([]);
  const dispatch = useAppDispatch();
  const jobsInfo = useAppSelector((state) => state.jobs);

  const {
    mutateAsync: createProject,
    isLoading: isLoadingCreateProjects,
    data: newProjectId,
  } = useMutation(euenoCreateProject, {
    onError: (error: Error) => {
      toast.error(error?.message);
    },
  });

  const { mutateAsync: uploadFile, isLoading: isLoadingUploadFile } = useMutation<string, Error, { file: File; projectId: string }>(["EUENOUploadFile"], euenoUploadFile, {
    onError: (error: Error) => {
      toast.error(error?.message);
    },
  });

  const initialValues: ICreateJobForm = {
    title: "",
    skills: [],
    scope: {},
    // budget: {
    //   type: 'Project budget',
    //   maxBudget: 0,
    //   from: 0,
    //   to: 0,
    // },
    budget: 0,
    describe: "",
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

  const handleSubmit = async (values: ICreateJobForm) => {
    // const formData = {
    //   title: values.title,
    //   description: values.describe,
    //   attachments: values.attachFile,
    //   status: JOB_STATUS.PUBLIC,
    //   estimate: values.estimate,
    //   budget: values.budget,
    // };
    // const projectId = await createProject({name: values.title});

    if (values.attachFile) console.log(values.attachFile);

    // await Promise.all(values.attachFile.)
    // dispatch({
    //   //@ts-ignore
    //   type: postJobs(formData).type,
    //   payload: formData,
    // });
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
                      <p className="font-nomal">This helps your job post stand out to the right candidates. It&quot;s the first thing they&quot;ll see, so make it count!</p>
                      <div className="py-6">
                        <p className="font-medium text-xl pb-2">Write a headline for your job post</p>
                        <FastField component={InputField} name="title" title="" placeholder="" className="mt-4 md:mt-0" inputClassName="h-[40px] px-2 text-medium" />
                        <div className="py-2">
                          <p className="font-medium">Example Titles</p>
                          <div className="px-3">
                            <div className="flex items-center">
                              <div className="h-[4px] w-[4px] rounded-full bg-[color:var(--primary-7)] mr-2"></div>
                              <p>Build responsive WordPress site with booking/payment functionality</p>
                            </div>
                            <div className="flex items-center">
                              <div className="h-[4px] w-[4px] rounded-full bg-[color:var(--primary-7)] mr-2"></div>
                              <p>Graphic designer needed to design ad creative for multiple campaigns</p>
                            </div>
                            <div className="flex items-center">
                              <div className="h-[4px] w-[4px] rounded-full bg-[color:var(--primary-7)] mr-2"></div>
                              <p>Facebook ad specialist needed for product launch</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-[color:var(--primary-10)]">
                      <p className="font-nomal">Consider the size of your project and the time it will take</p>
                      <div className="py-6">
                        <p className="font-medium text-xl pb-2">Sô ngày dự tính hoàn thành công việc</p>
                        <div className="flex gap-4 items-center">
                          <FastField inputClassName="text-right px-2 text-medium" component={InputField} name="estimate" value={values.estimate} type="number" label="" custom />
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
                      <p className="py-5">You will have the option to create milestones which divide your project into manageable phases.</p>
                    </div>
                    <div className="text-[color:var(--primary-10)]">
                      <div className="py-2">
                        <p className="font-medium my-4">Talent are looking for:</p>
                        <div className="px-3">
                          <div className="flex items-center">
                            <div className="h-[4px] w-[4px] rounded-full bg-[color:var(--primary-7)] mr-2"></div>
                            <p>Clear expectations about your task or deliverables</p>
                          </div>
                          <div className="flex items-center">
                            <div className="h-[4px] w-[4px] rounded-full bg-[color:var(--primary-7)] mr-2"></div>
                            <p>The skills required for your work</p>
                          </div>
                          <div className="flex items-center">
                            <div className="h-[4px] w-[4px] rounded-full bg-[color:var(--primary-7)] mr-2"></div>
                            <p>Good communication</p>
                          </div>
                          <div className="flex items-center">
                            <div className="h-[4px] w-[4px] rounded-full bg-[color:var(--primary-7)] mr-2"></div>
                            <p>Details about how you or your team like to work</p>
                          </div>
                        </div>
                      </div>
                      <div className="py-4">
                        <p className="font-medium text-xl pb-2">Describe your job</p>
                        <FastField component={TextareaField} name="describe" rows={8} placeholder="Already have a description? Paste it here!" />
                        <p className="text-[color:var(--gray-7)] mt-6">Need help?</p>
                        <p className="font-semibold text-[color:var(--primary-6)] hover:cursor-pointer">See examples of effective descriptions</p>
                      </div>
                      <div className="py-4">
                        <FastField
                          component={InputFileField}
                          name="attachFile"
                          title=""
                          placeholder=""
                          className="mt-4 md:mt-0"
                          inputClassName="px-2"
                          onChange={(filesList: FileList) => {
                            const fileLists = [];
                            //@ts-ignore
                            for (const file of filesList) {
                              if (file.type === "image/png") {
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
                        <p className="text-[color:var(--gray-7)]">Max file size: 100 MB</p>
                      </div>
                      <div className="flex justify-end space-x-6">
                        <Button
                          title="Draft Job Post"
                          className=" rounded-full px-8"
                          disabled={!_.isEmpty(errors) || _.isEmpty(touched)}
                          type="button"
                          variant="outline"
                          onClick={() => handleDraft(values)}
                        />
                        <Button title="Public Job Post" className=" rounded-full px-8" disabled={!_.isEmpty(errors) || _.isEmpty(touched)} type="submit" />
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
