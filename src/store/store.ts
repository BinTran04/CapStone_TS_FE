import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./rootReducer";
import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from "react-redux";

export const store = configureStore({
  reducer: rootReducer,
});

// Định nghĩa các type cho TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Custom hook để sử dụng trong componet
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
