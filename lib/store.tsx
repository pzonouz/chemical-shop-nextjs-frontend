import { combineReducers, configureStore } from "@reduxjs/toolkit";
import loadingReducer from "./features/utils/loading";
import { apiSlice } from "./features/api/api";

export const makeStore: any = () => {
  return configureStore({
    reducer: combineReducers({
      [apiSlice.reducerPath]: apiSlice.reducer,
      loading: loadingReducer,
    }),
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiSlice.middleware),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
