import { PayloadAction } from '@reduxjs/toolkit';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import factories from './factories';
import {
  getAllProposalByJob,
  getAllProposalByJobFailure,
  getAllProposalByJobSuccess,
  getProposal,
  getProposalFailure,
  getProposalSuccess,
  submitProposal,
  submitProposalFailure,
  submitProposalSuccess,
} from './proposalSlide';
import Router from 'next/router';
import { IApplyJobForm } from '@/interfaces';
import { getJobDetail } from '../jobs/jobsSlide';

function* handleCreateJob() {
  yield takeEvery(submitProposal.type, function* (payload: PayloadAction<IApplyJobForm>) {
    try {
      const response: any = yield call(() => factories.submitProposal(payload.payload));
      yield put({
        type: submitProposalSuccess.type,
        payload: response.data,
      });
      Router.push(`/proposals/${response.data.id}`);
    } catch (error) {
      yield put({
        type: submitProposalFailure.type,
        payload: error,
      });
    }
  });
}
function* handleGetProposalById() {
  yield takeEvery(getProposal.type, function* (payload: PayloadAction<string>) {
    try {
      const response: any = yield call(() => factories.getProposal(payload.payload));
      if (response.data.jobId) {
        yield put({
          type: getJobDetail(response.data.jobId).type,
          payload: response.data.jobId,
        });
      }
      yield put({
        type: getProposalSuccess.type,
        payload: response.data,
      });
    } catch (error) {
      yield put({
        type: getProposalFailure.type,
        payload: error,
      });
    }
  });
}

function* handleAllProposalByJob() {
  yield takeEvery(getAllProposalByJob.type, function* (payload: PayloadAction<string>) {
    try {
      const response: any = yield call(() => factories.getAllProposalByJob(payload.payload));
      yield put({
        type: getAllProposalByJobSuccess.type,
        payload: response.data,
      });
    } catch (error) {
      yield put({
        type: getAllProposalByJobFailure.type,
        payload: error,
      });
    }
  });
}

export default function* rootSaga() {
  yield all([fork(handleCreateJob), fork(handleGetProposalById), fork(handleAllProposalByJob)]);
}
