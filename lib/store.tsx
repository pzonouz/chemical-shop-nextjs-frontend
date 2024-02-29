import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/auth";
import userReducer from "./features/entities/user";
import categoriesReducer from "./features/entities/categories";
import { api } from "./middlewares/api";

export const makeStore = () => {
  return configureStore({
    reducer: combineReducers({
      auth: authReducer,
      user: userReducer,
      categories: categoriesReducer,
    }),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
