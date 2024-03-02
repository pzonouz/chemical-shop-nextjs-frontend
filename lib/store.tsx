import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/auth";
import userReducer from "./features/entities/user";
import categoriesReducer from "./features/entities/categories";
// import { api } from "./middlewares/api";
import loadingReducer from "./features/utils/loading";
import { apiSlice } from "./features/api/api";

export const makeStore = () => {
  return configureStore({
    reducer: combineReducers({
      [apiSlice.reducerPath]: apiSlice.reducer,
      auth: authReducer,
      user: userReducer,
      categories: categoriesReducer,
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
