import { Action, createAction } from '../action-utils';

export enum UserActionTypes {
  FETCH_USER = '[user] Fetch User',
  SET_USER_LOADING = '[user] Set User Loading',
  FETCH_USER_SUCCESS = '[user] Fetch User Success',
  FETCH_USER_FAILURE = '[user] Fetch User Failure',
}

export type FetchUserAction = Action<typeof UserActionTypes.FETCH_USER>;
export type FetchUserSuccess = Action<
  typeof UserActionTypes.FETCH_USER_SUCCESS,
  { name: string }
>;
export type FetchUserFailure = Action<
  typeof UserActionTypes.FETCH_USER_FAILURE,
  { message: string }
>;
export type SetUserLoading = Action<typeof UserActionTypes.SET_USER_LOADING>;

// Action Creators
export function fetchUser(): FetchUserAction {
  return createAction(UserActionTypes.FETCH_USER);
}
export function fetchUserSuccess(name: string): FetchUserSuccess {
  return createAction(UserActionTypes.FETCH_USER_SUCCESS, { name });
}
export function fetchUserFailure(message: string): FetchUserFailure {
  return createAction(UserActionTypes.FETCH_USER_FAILURE, { message });
}
export function setUserLoading(): SetUserLoading {
  return createAction(UserActionTypes.SET_USER_LOADING);
}

// Action types
export type UserAction =
  | FetchUserAction
  | FetchUserSuccess
  | FetchUserFailure
  | SetUserLoading;
