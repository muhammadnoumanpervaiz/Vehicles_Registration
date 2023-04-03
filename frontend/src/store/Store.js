import { configureStore } from "@reduxjs/toolkit";
import { VehicleApi, CategoryApi, AuthApi } from "../store/Services";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    [VehicleApi.reducerPath]: VehicleApi.reducer,
    [CategoryApi.reducerPath]:CategoryApi.reducer,
    [AuthApi.reducerPath]:AuthApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(VehicleApi.middleware, CategoryApi.middleware, AuthApi.middleware),
});

setupListeners(store.dispatch);