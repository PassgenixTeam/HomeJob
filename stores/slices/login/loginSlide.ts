import { ROLE } from '@/constants';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { IUpdateRole, IUser, LoginState, UserResponse } from './interface';
import { ILogin, IRegister } from '@/interfaces';
import { AppState } from '@/stores/store';
import { toast } from 'react-toastify';
import { clearToken, defaultUserInfo } from '@/utils/common';

const initialState: LoginState = {
  isLoading: false,
  error: '',
  isLoggedIn: false,
  info: defaultUserInfo,
};

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    loginHome: (state, action: PayloadAction<ILogin>) => {
      state.isLoading = true;
    },
    loginHomeSuccess: (state, action: PayloadAction<IUser>) => {
      state.isLoading = false;
      state.error = '';
      state.isLoggedIn = true;
      state.info = action.payload;
    },
    loginHomeFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
      state.isLoggedIn = false;
    },
    register: (state, action: PayloadAction<IRegister>) => {
      state.isLoading = true;
    },
    registerSuccess: (state, action: PayloadAction) => {
      state.isLoading = false;
      state.error = '';
      toast.success('Login To Join!');
    },
    registerFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    getProfile: (state, action: PayloadAction) => {
      state.isLoading = true;
    },
    getProfileSuccess: (state, action: PayloadAction<IUser>) => {
      state.isLoading = false;
      state.error = '';
      state.isLoggedIn = true;
      state.info = {
        ...state.info,
        ...action.payload,
      };
    },
    getProfileFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
      state.isLoggedIn = false;
    },
    signOutUser: (state, action: PayloadAction) => {
      state.isLoading = true;
    },
    signOutUserSuccess: (state, action: PayloadAction) => {
      state.isLoading = false;
      state.error = '';
      state.isLoggedIn = false;
      state.info = defaultUserInfo;
    },
    signOutUserFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
      state.isLoggedIn = false;
    },
    selectRole: (state, action: PayloadAction<IUpdateRole>) => {
      state.isLoading = true;
    },
    selectRoleSuccess: (state, action: PayloadAction<IUser>) => {
      state.isLoading = false;
      state.error = '';
      state.info = action.payload;
    },
    selectRoleFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
      state.isLoggedIn = false;
    },
  },
});

export const {
  loginHome,
  loginHomeSuccess,
  loginHomeFailure,
  register,
  registerSuccess,
  registerFailure,
  getProfile,
  getProfileSuccess,
  getProfileFailure,
  signOutUser,
  signOutUserSuccess,
  signOutUserFailure,
  selectRole,
  selectRoleSuccess,
  selectRoleFailure,
} = loginSlice.actions;

// Other code such as selectors can use the imported `AppState` type
export const selectIsLoading = (state: AppState) => state.login.isLoading;
export const selectError = (state: AppState) => state.login.error;
export const selectUserInfo = (state: AppState) => state.login.info;
export const selectIsLoggedIn = (state: AppState) => state.login.isLoggedIn;

export default loginSlice.reducer;
