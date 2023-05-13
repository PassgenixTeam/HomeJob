import { AppState } from "@/stores/store";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import {ICreateInternPayment, IUserPaymentInfo, PaymentState } from "./interface";
import { toast } from "react-toastify";

const initialState: PaymentState = {
  isLoading: false,
  error: "",
  paymentInfo:[],
};

export const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    getPaymentInfo: (state, action: PayloadAction) => {
      state.isLoading = true;
    },
    getPaymentInfoSuccess: (state, action: PayloadAction<IUserPaymentInfo[]>) => {
      state.isLoading = false;
      state.error = "";
      state.paymentInfo = action.payload
    },
    getPaymentInfoFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    payMethod: (state, action: PayloadAction<ICreateInternPayment>) => {
      state.isLoading = true;
    },
    payMethodSuccess: (state, action: PayloadAction) => {
      state.isLoading = false;
      state.error = "";
      toast.success("Create Payment Success!")
    },
    payMethodFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getPaymentInfo,
  getPaymentInfoSuccess,
  getPaymentInfoFailure,
  payMethod,
  payMethodSuccess,
  payMethodFailure,
} = paymentSlice.actions;

// Other code such as selectors can use the imported `AppState` type
export const selectIsLoading = (state: AppState) => state.login.isLoading;
export const selectError = (state: AppState) => state.login.error;

export default paymentSlice.reducer;
