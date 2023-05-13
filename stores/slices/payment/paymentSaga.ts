import { PayloadAction } from "@reduxjs/toolkit";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import factories from "./factories";
// import { IFile } from "./interface";
import {
  getPaymentInfo,
  getPaymentInfoFailure,
  getPaymentInfoSuccess,
  payMethod,
  payMethodFailure,
  payMethodSuccess,
} from "./paymentSlide";
import Router from "next/router";
import { ICreateInternPayment } from "./interface";
function* handleCreateJob() {
  yield takeEvery(
    payMethod.type,
    function* (payload: PayloadAction<ICreateInternPayment>) {
      try {
        const payInfo: any = yield call(() =>
          factories.payAction(payload.payload)
        );
        const resultPayment: any = yield factories.confirmPayment({
          paymentIntentId: payInfo.data.paymentIntentId,
        });
        console.log(resultPayment)
        yield put({
          type: payMethodSuccess.type,
          // payload: resultPayment.data,
        });
      } catch (error) {
        yield put({
          type: payMethodFailure.type,
          // error
        });
      }
    }
  );
}
function* handleGetPaymentInfo() {
  yield takeEvery(getPaymentInfo.type, function* (payload: PayloadAction) {
    try {
      const response: any = yield call(() =>
        factories.getPayments("cus_NZWqwjGC3HzD39")
      );
      yield put({
        type: getPaymentInfoSuccess.type,
        payload: response.data,
      });
    } catch (error) {
      yield put({
        type: getPaymentInfoFailure.type,
        // error
      });
    }
  });
}
export default function* rootSaga() {
  yield all([fork(handleCreateJob), fork(handleGetPaymentInfo)]);
}
