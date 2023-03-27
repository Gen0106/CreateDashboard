import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from 'react-redux';
import reducer from "./reducer";

const store = configureStore({
  reducer,
});

export default store;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>(); // custom hook to use AppDispatch