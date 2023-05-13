import { AppState } from '@/stores/store';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { IUpdateProfile, IUserProfile, ProfileState } from './interface';
import { toast } from 'react-toastify';
import { useAppSelector } from '@/stores/hooks';

const initialState: ProfileState = {
  isLoading: false,
  error: '',
  profile: null,
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    getProfile: (state, action: PayloadAction) => {
      state.isLoading = true;
    },
    getProfileSuccess: (state, action: PayloadAction<IUserProfile>) => {
      state.isLoading = false;
      state.error = '';
      state.profile = action.payload;
    },
    getProfileFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    updateProfile: (state, action: PayloadAction<IUpdateProfile>) => {
      state.isLoading = true;
    },
    updateProfileSuccess: (state, action: PayloadAction<IUserProfile>) => {
      state.isLoading = false;
      state.error = '';
      state.profile = {
        ...state.profile,
        ...action.payload,
      };
      toast.success('Update profile successfully!');
    },
    updateProfileFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
      toast.error('Update profile failure!');
    },
  },
});

export const { getProfile, getProfileSuccess, getProfileFailure, updateProfile, updateProfileFailure, updateProfileSuccess } =
  profileSlice.actions;

// Other code such as selectors can use the imported `AppState` type
export const selectIsLoading = (state: AppState) => state.profile.isLoading;
export const selectError = (state: AppState) => state.profile.error;
export const selectProfile = () => useAppSelector((state: AppState) => state.profile.profile);

export default profileSlice.reducer;
