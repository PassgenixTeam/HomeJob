import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { getProposal } from "@/stores/slices/proposal/proposalSlide";
import Loading from "@/components/common/Loading";
import PersonalInfoBar from "./personalInfo";
import ContractTerm from "./contractTerm";
import WorkDescription from "./workDescription";
import { FastField, Form, Formik } from "formik";
import Radio from "@/components/common/Radio";
import RadioField from "@/components/common/RadioField";
import TextLink from "@/components/common/Text/TextLink";
import { GiSpaceNeedle } from "react-icons/gi";
import Button from "@/components/common/Button";
import { AiOutlinePlus } from "react-icons/ai";
import { IOfferForm, PAID_OPTION, PAID_TYPE } from "@/interfaces";
import proposalSchema from "@/validations/proposalSchema";
export interface JobProposalDetailProps {}

export default function JobProposalDetail(props: JobProposalDetailProps) {
  const router = useRouter();
  const { pid: proposalId } = router.query;
  const dispatch = useAppDispatch();
  const proposalInfo = useAppSelector((state) => state.proposal);

  const initialValues: IOfferForm = {
    paymentOption: PAID_OPTION.FIXED_PRICE,
    amount: proposalInfo.detail?.amount||0,
    deposit: "all",
    dueDate: undefined,
    title: "",
    description: "",
    attachments: [],
    accept: false,
    milestones: [
      {
        description: "",
        dueDate: new Date().toISOString(),
        amount: 0,
      },
    ],
  };

  useEffect(() => {
    dispatch({
      type: getProposal(proposalId as string).type,
      payload: proposalId,
    });
  }, []);
  if (proposalInfo.isLoading) {
    return <Loading />;
  }
  return (
    <div className="flex justify-center w-full">
      <div className="w-full max-w-[1050px] px-4 space-y-8 text-[color:var(--gray-9)] my-10">
        <h6 className="text-3xl font-medium text-black">Send an Offer</h6>
        <Formik
          initialValues={initialValues}
          enableReinitialize
          onSubmit={(values) => {
            console.log("------>",values)
            // handleSubmit(values);
          }}
          validateOnChange={false}
          validationSchema={proposalSchema}
        >
          {(formikProps) => {
            const { values, setFieldValue, errors, touched } = formikProps;
            console.log(values, errors, touched)
            return (
              <Form>
                <div className="space-y-6">
                  <PersonalInfoBar />
                  <ContractTerm />
                  <WorkDescription />
                  <div className="w-full px-8 py-6 border rounded-xl">
                    <FastField
                      component={RadioField}
                      name="accept"
                      value={values.accept}
                      checked={values.accept}
                      label={
                        <div className="text-base flex items-center space-x-1">
                          <p className="flex space-x-1 flex-wrap">
                            Yes, I understand and agree to the{" "}
                            <TextLink className="px-1">
                              WorkFromHome Terms of Service,{" "}
                            </TextLink>
                            Including the
                            <TextLink className="px-1">User Agreement</TextLink>
                            and
                            <TextLink className="px-1">Privacy Policy</TextLink>
                          </p>
                        </div>
                      }
                      square
                      onClick={() => {
                        setFieldValue("accept", !values.accept);
                      }}
                    />
                    <div className="flex items-center justify-end space-x-6 mt-8">
                      <Button
                        title="Cancel"
                        variant="outline"
                        className="rounded-full py-[8px] px-[30px]"
                      />
                      <Button
                        type="submit"
                        title="Continue"
                        className="rounded-full py-[8px] px-[30px]"
                      />
                    </div>
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}
