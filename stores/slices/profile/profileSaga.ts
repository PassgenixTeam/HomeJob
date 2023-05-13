import { PayloadAction } from '@reduxjs/toolkit';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import factories from './factories';
import {
  getProfile,
  getProfileFailure,
  getProfileSuccess,
  updateProfile,
  updateProfileFailure,
  updateProfileSuccess,
} from '@/stores/slices/profile/profileSlice';
import { getProfileSuccess as getInfo } from '../login/loginSlide';
import { IUpdateProfile } from '@/stores/slices/profile/interface';
import { defaultUserInfo } from '@/utils/common';
import { isExitsKeys } from '@/utils/util';

function* handleGetProfile() {
  yield takeEvery(getProfile.type, function* (payload: PayloadAction) {
    try {
      const res: any = yield call(() => factories.getProfile());

      yield put({
        type: getProfileSuccess.type,
        payload: res.data,
      });
    } catch (error) {
      yield put({
        type: getProfileFailure.type,
        // error
      });
    }
  });
}

function* handleUpdateProfile() {
  yield takeEvery(updateProfile.type, function* (payload: PayloadAction<IUpdateProfile>) {
    try {
      const res: any = yield call(() => factories.updateProfile(payload.payload));

      yield put({
        type: updateProfileSuccess.type,
        payload: payload.payload,
      });

      // update info in loginSlice
      const keysInIUser = isExitsKeys(defaultUserInfo, Object.keys(payload.payload));

      if (keysInIUser.length > 0) {
        const infoUpdate = keysInIUser.reduce((acc, cur) => {
          return {
            ...acc,
            [cur]: payload.payload[cur as keyof IUpdateProfile],
          };
        }, {});

        yield put({
          type: getInfo.type,
          payload: infoUpdate,
        });
      }
    } catch (error) {
      console.log(error);

      yield put({
        type: updateProfileFailure.type,
      });
    }
  });
}

export default function* rootSaga() {
  yield all([fork(handleGetProfile), fork(handleUpdateProfile)]);
}
