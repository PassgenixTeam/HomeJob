import { ILogin, IRegister } from '@/interfaces';
import { clearToken, getRefreshToken, getToken, setToken } from '@/utils/common';
import { PayloadAction } from '@reduxjs/toolkit';
import jwtDecode from 'jwt-decode';
import moment from 'moment';
import Router from 'next/router';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import factories from './factories';
import { signOut } from "next-auth/react";
import {
  getProfile,
  getProfileFailure,
  getProfileSuccess,
  loginHome,
  loginHomeFailure,
  register,
  registerFailure,
  registerSuccess,
  selectRole,
  selectRoleFailure,
  selectRoleSuccess,
  signOutUser,
  signOutUserFailure,
  signOutUserSuccess,
} from './loginSlide';
import { IUpdateRole } from './interface';

function* handleLogin() {
  yield takeEvery(loginHome.type, function* (payload: PayloadAction<ILogin>) {
    try {
      // toast("success")
      // const response: any = yield call(() =>
      //   factories.requestLogin(payload.payload)
      // );
      // if (response.data.success) {
      //   localStorage.setItem("token", response.data.data.token);
      //   yield put({
      //     type: loginHomeSuccess.type,
      //     payload: response.data.data,
      //   });
      // } else {
      //   yield put({
      //     type: loginHomeFailure.type,
      //     payload: response.data.message,
      //   });
      // }
    } catch (error) {
      yield put({
        type: loginHomeFailure.type,
        // error
      });
    }
  });
}

function* handleGetProfile() {
  yield takeEvery(getProfile.type, function* (payload: PayloadAction) {
    try {
      const decoded: any = jwtDecode(getToken() || '');
      const today = new Date();
      const expDay = new Date(decoded.iat * 1000 + 1000 * 60 * 60 * 24 * 100);
      if (moment(expDay).isBefore(today.setDate(today.getDate() + 1))) {
        const responseAccessToken: any = yield call(() => factories.requestAccessToken(getRefreshToken() || ''));
        setToken(responseAccessToken.data.data.accessToken);
      }
      const response: any = yield call(() => factories.getProfile());
      yield put({
        type: getProfileSuccess.type,
        payload: response.data,
      });
    } catch (error) {
      signOut()
      clearToken();
      yield put({
        type: getProfileFailure.type,
        // error
      });
    }
  });
}
function* handleRegister() {
  yield takeEvery(register.type, function* (payload: PayloadAction<IRegister>) {
    try {
      const response: any = yield call(() => factories.requestRegister(payload.payload));
      yield put({
        type: registerSuccess.type,
      });

      Router.push('/login');
    } catch (error: any) {
      yield put({
        type: registerFailure.type,
        payload: error.response.data.message,
      });
    }
  });
}
function* handleSignOut() {
  yield takeEvery(signOutUser.type, function* (payload: PayloadAction<IRegister>) {
    try {
      const response: any = yield call(() => factories.requestSignOut());
      clearToken();
      yield put({
        type: signOutUserSuccess.type,
      });
      Router.push('/login');
    } catch (error) {
      yield put({
        type: signOutUserFailure.type,
        // error
      });
    }
  });
}
function* handleSelectRole() {
  yield takeEvery(selectRole.type, function* (payload: PayloadAction<IUpdateRole>) {
    try {
      const data = {
        role: payload.payload.role,
      };
      const response: any = yield call(() => factories.requestSelectRole(data));
      Router.push("/");
      yield put({
        type: selectRoleSuccess.type,
        payload: response.data,
      });
      payload.payload.onUpdate({ role: payload.payload.role });
      Router.push('/');
    } catch (error: any) {
      yield put({
        type: selectRoleFailure.type,
        payload: error.response.data.message,
      });
    }
  });
}
export default function* rootSaga() {
  yield all([fork(handleLogin), fork(handleGetProfile), fork(handleRegister), fork(handleSignOut), fork(handleSelectRole)]);
}
