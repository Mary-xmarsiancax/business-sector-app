import postReducer from "./reducers/post-reducer";
import {configureStore} from "@reduxjs/toolkit";
import thunk, {ThunkDispatch, ThunkMiddleware} from 'redux-thunk'
import {AnyAction} from "redux";

type RootReducer = typeof postReducer;
export type AppState = ReturnType<RootReducer>
const thunkMiddleware: ThunkMiddleware<AppState, AnyAction> = thunk;

const store = configureStore({ reducer: postReducer,   middleware: [thunkMiddleware], devTools: true })

type PropertiesType<T> = T extends { [key: string]: infer u } ? u : never
export type InferActionsTypes<T extends { [key: string]: (...arg: any[]) => any }> = ReturnType<PropertiesType<T>>
type AppAction = ReturnType<typeof store.dispatch>;
export type AppDispatch = ThunkDispatch<AppState, any, AppAction>;

export default store;