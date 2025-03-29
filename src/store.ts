import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import { boardReducer } from "./state";

export const store = configureStore({
  reducer: {
    board: boardReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
