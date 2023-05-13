import { PayloadAction } from '@reduxjs/toolkit';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import factories from './factories';
// import { IFile } from "./interface";
import {
  getFileLink,
  getFileLinkFailure,
  getFileLinkSuccess,
  getJobDetail,
  getJobDetailFailure,
  getJobDetailSuccess,
  getJobs,
  getJobsFailure,
  getJobsSuccess,
  getSkillList,
  getSkillListFailure,
  getSkillListSuccess,
  postJobs,
  postJobsFailure,
  postJobsSuccess,
} from './jobsSlide';
import { IJobsRequest } from './interface';
import Router from 'next/router';
function* handleGetFileLink() {
  yield takeEvery(getFileLink.type, function* (payload: PayloadAction<FormData>) {
    try {
      const response: any = yield call(() => factories.getFileLink(payload.payload));
      yield put({
        type: getFileLinkSuccess.type,
        payload: response.data.data,
      });
    } catch (error) {
      yield put({
        type: getFileLinkFailure.type,
        // error
      });
    }
  });
}
function* handleCreateJob() {
  yield takeEvery(postJobs.type, function* (payload: PayloadAction<IJobsRequest>) {
    try {
      const response: any = yield call(() => factories.postJobs(payload.payload));
      yield put({
        type: postJobsSuccess.type,
        payload: response.data,
      });
      Router.push(`/job/${response.data.id}`);
    } catch (error) {
      yield put({
        type: postJobsFailure.type,
        // error
      });
    }
  });
}
function* handleGetSkillList() {
  yield takeEvery(getSkillList.type, function* (payload: PayloadAction) {
    try {
      const response: any = yield call(() => factories.getSkills());
      yield put({
        type: getSkillListSuccess.type,
        payload: response.data,
      });
    } catch (error) {
      yield put({
        type: getSkillListFailure.type,
        // error
      });
    }
  });
}
function* handleGetJobDetail() {
  yield takeEvery(getJobDetail.type, function* (payload: PayloadAction<string>) {
    try {
      const response: any = yield call(() => factories.getJobDetail(payload.payload));
      yield put({
        type: getJobDetailSuccess.type,
        payload: response.data,
      });
    } catch (error) {
      yield put({
        type: getJobDetailFailure.type,
        // error
      });
    }
  });
}

function* handleGetJobs() {
  yield takeEvery(getJobs.type, function* (payload: PayloadAction<string>) {
    try {
      const response: any = yield call(() => factories.getJobs(payload.payload));
      yield put({
        type: getJobsSuccess.type,
        payload: response.data,
      });
    } catch (error) {
      yield put({
        type: getJobsFailure.type,
        // error
      });
    }
  });
}

export default function* rootSaga() {
  yield all([fork(handleGetFileLink), fork(handleCreateJob), fork(handleGetSkillList), fork(handleGetJobDetail), fork(handleGetJobs)]);
}
