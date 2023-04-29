import { configureStore } from "@reduxjs/toolkit";
import reducerBills from './bills';
import { TypedUseSelectorHook, useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import thunk from "redux-thunk";
import reducerUsers from './users';

const store = configureStore({
    reducer: {
        reducerBills, reducerUsers
    },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;