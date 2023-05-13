import  loginSaga  from '@/stores/slices/login/loginSaga';
import  jobsSaga  from '@/stores/slices/jobs/jobsSaga';
import  paymentSaga  from '@/stores/slices/payment/paymentSaga';
import  proposalSaga  from '@/stores/slices/proposal/proposalSaga';
import profileSaga from '@/stores/slices/profile/profileSaga';

import { all } from 'redux-saga/effects';
export default function* rootSaga() {
  yield all([
    loginSaga(),
    jobsSaga(),
    paymentSaga(),
    proposalSaga(),
    profileSaga()
  ]);
}
