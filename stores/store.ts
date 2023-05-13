import  loginReducer  from '@/stores/slices/login/loginSlide';
import  jobsReducer  from '@/stores/slices/jobs/jobsSlide';
import  paymentReducer  from '@/stores/slices/payment/paymentSlide';
import  proposalReducer  from '@/stores/slices/proposal/proposalSlide';
import profileReducer from '@/stores/slices/profile/profileSlice';
import { configureStore,AnyAction,combineReducers } from '@reduxjs/toolkit';
import { MakeStore, createWrapper, HYDRATE  } from 'next-redux-wrapper';
import { Store } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './rootSaga';

const rootReducer = combineReducers({
  login: loginReducer,
  jobs: jobsReducer,
  payment:paymentReducer,
  proposal:proposalReducer,
  profile: profileReducer,
});
// ReturnType<typeof rootReducer>
const masterReducer = (state: any, action: AnyAction) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    };
    return nextState;
  }else {
    if(action.type==="profile/reset")
      state=undefined
    return rootReducer(state, action);
  }
};

const makeStore: MakeStore<Store> = () => {
  const sagaMiddleware = createSagaMiddleware();
  const store = configureStore({
    reducer: masterReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }).concat(sagaMiddleware),
    devTools: process.env.NODE_ENV !== 'production',
  });

  sagaMiddleware.run(rootSaga);

  return store;
};
export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<typeof rootReducer>;
export type AppDispatch = AppStore['dispatch'];
export const wrapper = createWrapper<AppStore>(makeStore, { debug: process.env.NODE_ENV !== 'production' });
