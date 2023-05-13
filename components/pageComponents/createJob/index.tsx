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
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import RadioField from "@/components/common/RadioField";
import TextareaField from "@/components/common/TextareaField";
import _ from "lodash";
import InputFileField from "@/components/common/InputFileField";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { getFileLink, getSkillList, postJobs } from "@/stores/slices/jobs/jobsSlide";
import { ISkills } from "@/stores/slices/jobs/interface";
import Loading from "@/components/common/Loading";

export interface CreateJobProps {}

export default function CreateJob(props: CreateJobProps) {
  const [step, setStep] = useState<number>(1);
  const [imageUrl, setImageUrl] = useState<any>([]);
  const [skills, setSkills] = useState<ISkills[]>([]);
  const dispatch = useAppDispatch();
  const jobsInfo = useAppSelector((state) => state.jobs);
  const initialValues: ICreateJobForm = {
    title: "",
    skills: [],
    scope: {
    },
    budget: {
      type: "Project budget",
      maxBudget: 0,
      from: 0,
      to: 0,
    },
    describe: "",
    attachFile: null,
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
      scopeType: values.scope.size,
      experienceLevel: values.scope.level,
      projectLength: values.scope.time,
      budget: values.budget.maxBudget,
      hourlyTo: values.budget.from,
      hourlyFrom: values.budget.to,
      attachments: values.attachFile ,
      status: JOB_STATUS.PUBLIC,
      skills: values.skills.map(item=>item.value),
    };
    dispatch({
      //@ts-ignore
      type:postJobs(formData).type,
      payload:formData
    })
  };
  const handleDraft = (values:ICreateJobForm) => {
    const formData = {
      title: values.title,
      description: values.describe,
      scopeType: values.scope.size,
      experienceLevel: values.scope.level,
      projectLength: values.scope.time,
      budget: values.budget.maxBudget,
      hourlyTo: values.budget.from,
      hourlyFrom: values.budget.to,
      attachments: jobsInfo.fileUrl.map(item=>item.url),
      status: JOB_STATUS.DRAFT,
      skills: values.skills.map(item=>item.value),
    };
    dispatch({
      type:postJobs(formData).type,
      payload:formData
    })
  }
  useEffect(()=>{
    dispatch(getSkillList())
  },[])
  useEffect(()=>{
    if(jobsInfo.skillList?.length!==0){
      setSkills(jobsInfo.skillList)
    }
  },[jobsInfo.skillList])
  
  return (
    <div className="w-full flex justify-center relative">
      {jobsInfo.isLoading && (
        <div className="absolute w-full h-full z-50 flex items-center justify-center bg-[color:var(--primary-1)] opacity-50">
          <Loading size={34} color="#40a9ff"/>
        </div>
      )}
      <div className="w-full max-w-[1440px] px-8">
        <h1 className="text-4xl font-bold text-center py-3 my-6 text-[color:var(--gray-9)]">
          Create Job
        </h1>
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
            return (
              <Form>
                <CreateStep
                  isOpen={step === 1}
                  step={1}
                  total={5}
                  onClick={() => {
                    (step1?.current as any)?.scrollIntoView({
                      behavior: "smooth",
                      block: "center",
                      inline: "center",
                    });
                    setStep(1);
                  }}
                  subject="Title"
                  title="Let's start with a title"
                  ref={step1}
                >
                  <div className="text-[color:var(--primary-10)]">
                    <p className="px-8 font-nomal">
                      This helps your job post stand out to the right
                      candidates. It&quot;s the first thing they&quot;ll see, so make it
                      count!
                    </p>
                    <div className="py-6 px-[80px]">
                      <p className="font-medium text-xl pb-2">
                        Write a headline for your job post
                      </p>
                      <FastField
                        component={InputField}
                        name="title"
                        title=""
                        placeholder=""
                        className="mt-4 md:mt-0"
                        inputClassName="h-[40px] px-2 text-medium"
                      />
                      <div className="py-2">
                        <p className="font-medium">Example Titles</p>
                        <div className="px-3">
                          <div className="flex items-center">
                            <div className="h-[4px] w-[4px] rounded-full bg-[color:var(--primary-7)] mr-2"></div>
                            <p>
                              Build responsive WordPress site with
                              booking/payment functionality
                            </p>
                          </div>
                          <div className="flex items-center">
                            <div className="h-[4px] w-[4px] rounded-full bg-[color:var(--primary-7)] mr-2"></div>
                            <p>
                              Graphic designer needed to design ad creative for
                              multiple campaigns
                            </p>
                          </div>
                          <div className="flex items-center">
                            <div className="h-[4px] w-[4px] rounded-full bg-[color:var(--primary-7)] mr-2"></div>
                            <p>
                              Facebook ad specialist needed for product launch
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Button
                      title="Next Step"
                      className="ml-auto mr-8 rounded-full px-8"
                      disabled={!!errors.title || !touched.title}
                      onClick={() => handleNextStep(2)}
                      type="button"
                    />
                  </div>
                </CreateStep>
                <CreateStep
                  isOpen={step === 2}
                  step={2}
                  total={5}
                  onClick={() => {
                    (step2?.current as any)?.scrollIntoView({
                      behavior: "smooth",
                      block: "center",
                      inline: "center",
                    });
                    setStep(2);
                  }}
                  subject="Skills"
                  ref={step2}
                  title="What are the main skills required for your work?"
                >
                  <div className="text-[color:var(--primary-10)]">
                    <div className="py-6 px-[80px]">
                      <p className="font-medium text-xl pb-2">
                        Search skills or add your own
                      </p>
                      <FastField
                        component={SelectField}
                        name="skills"
                        title=""
                        className="mt-4 md:mt-0"
                        inputClassName="h-[40px] px-2 text-medium"
                        height="40px"
                        isMulti
                        options={jobsInfo.skillList?.map((item) => {
                          return { value: item.id, label: item.name };
                        })}
                        onChange={(
                          value: { value: string; label: string }[]
                        ) => {
                          setSkills(
                            jobsInfo.skillList.filter(
                              (item) =>
                                !value.find((itemC) => itemC.value === item.id)
                            )
                          );
                        }}
                      />
                      <div className="py-2">
                        <div className="flex items-center text-[color:var(--primary-7)] space-x-3 mb-6">
                          <div>
                            <BsBookmarkStarFill />
                          </div>
                          <p>For the best results, add 3-5 skills</p>
                        </div>
                        <p className="font-medium mt-2">
                          Popular skills for Full Stack Development
                        </p>
                        <div className="px-3 flex flex-wrap mt-4">
                          {skills.map((item, index) => {
                            return (
                              <div
                                key={index}
                                className="flex items-center space-x-2 rounded-full px-3 py-1 mb-3 mr-3
                                 bg-[color:var(--primary-3)] hover:cursor-pointer"
                                onClick={() => {
                                  const skill = [...values.skills];
                                  skill.push({ value: item.id, label: item.name });
                                  setFieldValue("skills", skill);
                                  setSkills(
                                    skills.filter((itemC) => itemC.id !== item.id)
                                  );
                                }}
                              >
                                <p>{item.name}</p>
                                <BsPlus size={22} />
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                    <Button
                      title="Next Step"
                      className="ml-auto mr-8 rounded-full px-8"
                      disabled={values.skills.length < 3}
                      onClick={() => handleNextStep(3)}
                      type="button"
                    />
                  </div>
                </CreateStep>
                <CreateStep
                  isOpen={step === 3}
                  step={3}
                  total={5}
                  onClick={() => {
                    (step3?.current as any)?.scrollIntoView({
                      behavior: "smooth",
                      block: "center",
                      inline: "center",
                    });
                    setStep(3);
                  }}
                  subject="Scope"
                  ref={step3}
                  title="Next, estimate the scope of your work"
                >
                  <div className="text-[color:var(--primary-10)]">
                    <p className="px-8 font-nomal">
                      Consider the size of your project and the time it will
                      take
                    </p>
                    <div className="py-6 px-[80px]">
                      <p className="font-medium text-xl pb-2">
                        Choose the size of Job
                      </p>
                      <FastField
                        component={RadioField}
                        name="scope.size"
                        value={values.scope.size}
                        label="Large"
                        checked={values.scope.size === SCOPE_TYPE.LARGE}
                        onClick={() => {
                          setFieldValue("scope.size", SCOPE_TYPE.LARGE);
                        }}
                        description="Longer term or complex initiatives (ex. design and build a full website)"
                      />
                      <FastField
                        component={RadioField}
                        name="scope.size"
                        value={values.scope.size}
                        label="Medium"
                        checked={values.scope.size === SCOPE_TYPE.MEDIUM}
                        onClick={() => {
                          setFieldValue("scope.size", SCOPE_TYPE.MEDIUM);
                        }}
                        description="Well-defined project (ex. a landing page)"
                      />
                      <FastField
                        component={RadioField}
                        name="scope.size"
                        value={values.scope.size}
                        label="Small"
                        checked={values.scope.size === SCOPE_TYPE.SMALL}
                        onClick={() => {
                          setFieldValue("scope.size", SCOPE_TYPE.SMALL);
                        }}
                        description="Quick and straightforward task (ex.update text and images on a webpage)"
                      />
                      <div className="py-2">
                        <p className="font-medium text-xl pb-2">
                          How long will your work take?
                        </p>
                        <FastField
                          component={RadioField}
                          name="scope.time"
                          value={values.scope.time}
                          label="3 to 6 months"
                          checked={values.scope.time === PROJECT_LENGTH.THREE_TO_SIX_MONTHS}
                          onClick={() => {
                            setFieldValue("scope.time", PROJECT_LENGTH.THREE_TO_SIX_MONTHS);
                          }}
                        />
                        <FastField
                          component={RadioField}
                          name="scope.time"
                          value={values.scope.time}
                          label="1 to 3 months"
                          checked={values.scope.time === PROJECT_LENGTH.ONE_TO_THREE_MONTHS}
                          onClick={() => {
                            setFieldValue("scope.time", PROJECT_LENGTH.ONE_TO_THREE_MONTHS);
                          }}
                        />
                        <FastField
                          component={RadioField}
                          name="scope.time"
                          value={values.scope.time}
                          label="Less than 1 month"
                          checked={values.scope.time === PROJECT_LENGTH.LESS_THAN_ONE_MONTH}
                          onClick={() => {
                            setFieldValue("scope.time", PROJECT_LENGTH.LESS_THAN_ONE_MONTH);
                          }}
                        />
                      </div>
                      <div className="py-2">
                        <p className="font-medium text-xl pb-2">
                          What level of experience it need?
                        </p>
                        <p className="font-normal">
                          This won&quot;t restrict any proposals, but helps match
                          expertise to your budget
                        </p>
                        <FastField
                          component={RadioField}
                          name="scope.level"
                          value={values.scope.level}
                          label="Expert"
                          checked={values.scope.level === EXPERIENCE_LEVEL.EXPERT}
                          onClick={() => {
                            setFieldValue("scope.level", EXPERIENCE_LEVEL.EXPERT);
                          }}
                          description="Looking for comprehensive and deep expertise in this field"
                        />
                        <FastField
                          component={RadioField}
                          name="scope.level"
                          value={values.scope.level}
                          label="Intermediate"
                          checked={values.scope.level === EXPERIENCE_LEVEL.INTERMEDIATE}
                          onClick={() => {
                            setFieldValue("scope.level", EXPERIENCE_LEVEL.INTERMEDIATE);
                          }}
                          description="Looking for substantial experience in this field"
                        />
                        <FastField
                          component={RadioField}
                          name="scope.level"
                          value={values.scope.level}
                          label="Entry"
                          checked={values.scope.level ===EXPERIENCE_LEVEL.ENTRY_LEVEL}
                          onClick={() => {
                            setFieldValue("scope.level",EXPERIENCE_LEVEL.ENTRY_LEVEL);
                          }}
                          description="Looking for someone relatively new to this field"
                        />
                      </div>
                    </div>
                    <Button
                      title="Next Step"
                      className="ml-auto mr-8 rounded-full px-8"
                      disabled={!!errors.scope}
                      onClick={() => handleNextStep(4)}
                      type="button"
                    />
                  </div>
                </CreateStep>
                <CreateStep
                  isOpen={step === 4}
                  step={4}
                  total={5}
                  onClick={() => {
                    (step4?.current as any)?.scrollIntoView({
                      behavior: "smooth",
                      block: "center",
                      inline: "center",
                    });
                    setStep(4);
                  }}
                  subject="Budget"
                  ref={step4}
                  title="Tell us about your budget."
                >
                  <div className="text-[color:var(--primary-10)]">
                    <p className="px-8 font-nomal">
                      This will help us match you to talent within your range
                    </p>
                    <div className="py-6 px-[80px]">
                      <div className="flex justify-center items-center space-x-6">
                        <div
                          className={`w-[260px] transition-all hover:cursor-pointer h-fit rounded-md 
                        p-2 ${
                          values.budget.type === "Project budget" &&
                          "bg-[color:var(--primary-1)]"
                        } border-[2px] border-[color:var(--primary-7)]`}
                          onClick={() =>
                            setFieldValue("budget.type", "Project budget")
                          }
                        >
                          <div className="flex justify-between items-center">
                            <MdOutlineSell size={22} className="ml-4 mt-3" />
                            <FastField
                              component={RadioField}
                              name="budget.type"
                              value={values.budget.type}
                              label=""
                              checked={values.budget.type === "Project budget"}
                              custom
                            />
                          </div>
                          <p className="text-2xl font-semibold ml-4 my-3">
                            Project budget
                          </p>
                        </div>
                        <div
                          className={`w-[260px] transition-all hover:cursor-pointer h-fit rounded-md p-2 border-[2px] 
                        border-[color:var(--primary-7)] ${
                          values.budget.type === "Hourly rate" &&
                          "bg-[color:var(--primary-1)]"
                        }`}
                          onClick={() =>
                            setFieldValue("budget.type", "Hourly rate")
                          }
                        >
                          <div className="flex justify-between items-center">
                            <HiOutlineClock size={24} className="ml-4 mt-3" />
                            <FastField
                              component={RadioField}
                              name="budget.type"
                              value={values.budget.type}
                              label=""
                              checked={values.budget.type === "Hourly rate"}
                              custom
                            />
                          </div>
                          <p className="text-2xl font-semibold ml-4 my-3">
                            Hourly rate
                          </p>
                        </div>
                      </div>
                      <div className="w-[75%] overflow-hidden relative h-[550px] mx-auto">
                        <div
                          className={`transition-all z-0 absolute flex flex-col justify-between h-full w-full pt-[35px] left-0 ${
                            values.budget.type !== "Project budget" &&
                            "translate-x-[-100%]"
                          }`}
                        >
                          <div>
                            <p className="font-semibold py-4">
                              Maximum project budget (USD)
                            </p>
                            <FastField
                              component={InputField}
                              name="budget.maxBudget"
                              title=""
                              placeholder="0"
                              className="mt-4 w-[150px]"
                              type="number"
                              inputClassName="h-[40px] px-2 text-medium text-right"
                              iconLeft={<BsCurrencyDollar />}
                            />
                            <p className="py-5">
                              You will have the option to create milestones
                              which divide your project into manageable phases.
                            </p>
                          </div>
                          <p className="mt-auto mb-0 text-[color:var(--primary-6)] font-semibold hover:cursor-pointer">
                            Not ready to set a project budget?
                          </p>
                        </div>
                        <div
                          className={`transition-all z-0 absolute w-full flex flex-col justify-between h-full pt-[25px] left-0 ${
                            values.budget.type !== "Hourly rate" &&
                            "translate-x-[100%]"
                          }`}
                        >
                          <div>
                            <div className="flex space-x-14 items-center">
                              <div className="flex items-end space-x-1">
                                <FastField
                                  component={InputField}
                                  name="budget.from"
                                  title="From"
                                  placeholder="0"
                                  className="mt-4 w-[150px]"
                                  type="number"
                                  inputClassName="h-[40px] px-2 text-medium text-right"
                                  iconLeft={<BsCurrencyDollar />}
                                />
                                <p className="mb-2">/hour</p>
                              </div>
                              <div className="flex items-end space-x-1">
                                <FastField
                                  component={InputField}
                                  name="budget.to"
                                  title="To"
                                  placeholder="0"
                                  className="mt-4 w-[150px]"
                                  type="number"
                                  inputClassName="h-[40px] px-2 text-medium text-right"
                                  iconLeft={<BsCurrencyDollar />}
                                />
                                <p className="mb-2">/hour</p>
                              </div>
                            </div>
                            <p className="text-xs py-3">
                              This is the average rate for similar projects.
                            </p>
                            <p className="py-6">
                              Professionals tend to charge{" "}
                              <b>{`$${values.budget.from} - $${values.budget.to}`}</b>
                              /hour (USD) for full stack development like yours.
                              Experts may charge higher rates.
                            </p>
                            <div className="flex justify-center">
                              <BarChart
                                width={450}
                                height={260}
                                data={chartData}
                                barGap={0}
                                barCategoryGap={-1}
                              >
                                <XAxis dataKey="name" />
                                <Tooltip />
                                <Bar dataKey="post" fill="#40a9ff">
                                  {chartData.map((item: any, index: number) => (
                                    <Cell
                                      key={`cell-${index}`}
                                      fill={
                                        item.post >= 3000
                                          ? "#096dd9"
                                          : "#40a9ff"
                                      }
                                    />
                                  ))}
                                </Bar>
                              </BarChart>
                            </div>
                            <p className="text-center text-sm mt-[-15px]">
                              hourly rate (USD)
                            </p>
                          </div>
                          <p className="mt-auto mb-0 text-[color:var(--primary-6)] font-semibold hover:cursor-pointer">
                            Not ready to set an hourly rate?
                          </p>
                        </div>
                      </div>
                    </div>
                    <Button
                      title="Next Step"
                      className="ml-auto mr-8 rounded-full px-8"
                      disabled={!!errors.budget}
                      onClick={() => handleNextStep(5)}
                      type="button"
                    />
                  </div>
                </CreateStep>
                <CreateStep
                  isOpen={step === 5}
                  step={5}
                  total={5}
                  ref={step5}
                  onClick={() => {
                    (step5?.current as any)?.scrollIntoView({
                      behavior: "smooth",
                      block: "center",
                      inline: "center",
                    });
                    setStep(5);
                  }}
                  subject="Finally"
                  title="Last step, start the conversation"
                >
                  <div className="text-[color:var(--primary-10)]">
                    <div className="py-2">
                      <p className="font-medium my-4">
                        Talent are looking for:
                      </p>
                      <div className="px-3">
                        <div className="flex items-center">
                          <div className="h-[4px] w-[4px] rounded-full bg-[color:var(--primary-7)] mr-2"></div>
                          <p>
                            Clear expectations about your task or deliverables
                          </p>
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
                    <div className="py-4 px-[80px]">
                      <p className="font-medium text-xl pb-2">Add a title</p>
                      <FastField
                        component={InputField}
                        name="title"
                        title=""
                        placeholder=""
                        className="mt-4 md:mt-0"
                        inputClassName="h-[40px] px-2 text-medium"
                      />
                    </div>
                    <div className="py-4 px-[80px]">
                      <p className="font-medium text-xl pb-2">
                        Describe your job
                      </p>
                      <FastField
                        component={TextareaField}
                        name="describe"
                        rows={8}
                        placeholder="Already have a description? Paste it here!"
                      />
                      <p className="text-[color:var(--gray-7)] mt-6">
                        Need help?
                      </p>
                      <p className="font-semibold text-[color:var(--primary-6)] hover:cursor-pointer">
                        See examples of effective descriptions
                      </p>
                    </div>
                    <div className="py-4 px-[80px]">
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
                            if (file.type === "image/png") {
                              fileLists.push(URL.createObjectURL(file));
                            }
                          }
                          setImageUrl(fileLists);
                        }}
                      />
                      <div className="flex space-x-3">
                        {imageUrl?.map((item: any, index: number) => (
                          <img
                            key={index}
                            src={item}
                            alt="Work from home"
                            className="w-[100px] h-[100px] object-cover"
                          />
                        ))}
                      </div>
                      <p className="text-[color:var(--gray-7)]">
                        Max file size: 100 MB
                      </p>
                    </div>
                    <div className="flex justify-end space-x-6">
                      <Button
                        title="Draft Job Post"
                        className=" rounded-full px-8"
                        disabled={!_.isEmpty(errors) || _.isEmpty(touched)}
                        type="button"
                        variant="outline"
                        onClick={()=>handleDraft(values)}
                      />
                      <Button
                        title="Public Job Post"
                        className=" rounded-full px-8"
                        disabled={!_.isEmpty(errors) || _.isEmpty(touched)}
                        type="submit"
                      />
                    </div>
                  </div>
                </CreateStep>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}
