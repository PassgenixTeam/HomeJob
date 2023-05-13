import Button from '@/components/common/Button';
import Modal from '@/components/common/Modal';
import TextLink from '@/components/common/Text/TextLink';
import { IApplyJobForm, PAID_TYPE, PROJECT_LENGTH } from '@/interfaces';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import { submitProposal } from '@/stores/slices/proposal/proposalSlide';
import ApplyJobSchema from '@/validations/applyJobSchema';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import AdditionalDetail from './additionalDetail';
import ProposalBanner from './banner';
import JobDetail from './jobDetail';
import Terms from './term';
import { useState } from 'react';
import Radio from '@/components/common/Radio';
import _ from 'lodash';
import { IoClose } from 'react-icons/io5';
import Bidding from '@/components/pageComponents/proposal/job/bidding';
export interface ProposalJobProps {}

export default function ProposalJob(props: ProposalJobProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const jobInfo = useAppSelector((state) => state.jobs);
  const { jid: JobId } = router.query;
  const initialValues: IApplyJobForm = {
    jobId: router.query.jid as string,
    paidType: PAID_TYPE.MILESTONE,
    amount: 0,
    milestones: [
      {
        description: '',
        dueDate: new Date().toISOString(),
        amount: 0,
      },
    ],
    projectLong: PROJECT_LENGTH.LESS_THAN_ONE_MONTH,
    coverLetter: '',
    attachments: [],
    boostCoin: 0,
    boostTime: '2023-04-24',
    bid: 0,
    showModal: false,
    acceptance: false,
    bidding: 0,
  };
  const handleSubmit = (values: IApplyJobForm) => {
    const { acceptance, showModal, ...data } = values;
    dispatch({
      type: submitProposal(data).type,
      payload: data,
    });
  };
  return (
    <div className="flex justify-center w-full">
      <div className="w-full max-w-[1050px] px-4 space-y-8 text-[color:var(--gray-9)]">
        <h6 className="px-12 text-3xl font-medium pb-4 pt-6">Submit a Proposal</h6>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          onSubmit={(values) => {
            handleSubmit(values);
          }}
          validationSchema={ApplyJobSchema}
        >
          {(formikProps) => {
            const { errors, touched, values, setFieldValue, validateForm, setFieldTouched } = formikProps;
            console.log(values);
            return (
              <Form>
                <div className="space-y-8">
                  <ProposalBanner />
                  <JobDetail />
                  <Terms />
                  <AdditionalDetail />
                  <Bidding jobId={router.query.jid as string} />
                  <div className="flex space-x-6">
                    <Button
                      title="Send for 6 Connects"
                      className="rounded-full h-fit py-[6px] font-medium"
                      type="button"
                      onClick={async () => {
                        const err = await validateForm();
                        setFieldTouched('coverLetter');
                        setFieldTouched('amount');
                        setFieldTouched('milestones[0].description');
                        setFieldTouched('milestones[0].amount');
                        if (_.isEmpty(err)) {
                          setFieldValue('showModal', true);
                        }
                      }}
                    />
                    <TextLink>Cancel</TextLink>
                  </div>
                </div>
                <div
                  className={`fixed w-full h-screen top-[0px] left-0 mt-[0px] bg-[rgba(0,0,0,0.75)] 
                 flex justify-center items-center ${values.showModal ? 'z-[999]' : 'z-[-1] opacity-0'}`}
                >
                  <div className="w-[700px] bg-white rounded-2xl px-8 py-4">
                    <div className=" mx-2">
                      <div className="flex justify-between items-center mb-10">
                        <h6 className="font-medium text-2xl">3 things you need to know</h6>
                        <div className="hover:cursor-pointer" onClick={() => setFieldValue('showModal', false)}>
                          <IoClose size={26} />
                        </div>
                      </div>
                      <p className="my-6">
                        You're submitting for a fixed-price project. White the majority of WorFromHome projects are completed successfully,
                        please keep a few things in mind:
                      </p>
                      <div className="space-y-3">
                        <div className="pl-3">
                          <h6 className="font-medium">1. Escrow Protection is in place for fixed-price jobs</h6>
                          <p className="ml-4 leading-6">
                            Before you start the project, you and the client must agree to requirements, a budget and milestones.
                            WorkFromHome charges the client at the beginning of the project, and the money for a milestone is deposited in
                            escrow.
                          </p>
                        </div>
                        <div className="pl-3">
                          <h6 className="font-medium">2. Escrow funded payments are released when the client approves work</h6>
                          <p className="ml-4 leading-6">
                            When milestones are completed, the client can either approve work and release payment or request modifications
                            to the work. Clients can also request that you approve the return of funds held in escrow.
                          </p>
                        </div>
                        <div className="pl-3">
                          <h6 className="font-medium">3. WorkFromHome offers mediation services</h6>
                          <p className="ml-4 leading-6">
                            If you do the work and the client refuses to pay, WorkFromHome can help mediate the dispute.
                          </p>
                        </div>
                      </div>
                      <p className="my-6">
                        Please choose fixed-price jobs carefully. Only funds deposited for an active milestone are covered by Escrow
                        Protection.
                      </p>
                      <Radio
                        label="Yes, I understand"
                        square
                        name="acceptance"
                        checked={values.acceptance}
                        onClick={() => setFieldValue('acceptance', !values.acceptance)}
                      />
                      <div className="flex justify-end space-x-6 pb-3 mt-6">
                        <TextLink onClick={() => setFieldValue('showModal', false)}>Cancel</TextLink>
                        <Button
                          title="Continue to submit"
                          className="py-[8px] rounded-full font-semibold px-[20px]"
                          disabled={!values.acceptance}
                          type="submit"
                        />
                      </div>
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
