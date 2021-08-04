import { createSelector } from 'reselect';
import { Nullable } from 'src/types/Nullable';
import { AppState } from '../reducers';
import { UserAction, UserActionTypes } from './user.actions';

export enum CallStatus {
  IDLE = 'IDLE',
  SUCCESS = 'SUCCESS',
  LOADING = 'LOADING',
  FAILURE = 'FAILURE',
}

export interface UserSuccessState {
  readonly status: CallStatus.SUCCESS;
  readonly name: Nullable<string>;
}
export interface UserErrorState {
  readonly status: CallStatus.FAILURE;
  readonly errorMessage: string;
}
export function isUserSuccessState(
  state: UserState,
): state is UserSuccessState {
  if (state.status === CallStatus.SUCCESS) {
    return true;
  }
  return false;
}

export type UserState =
  | UserSuccessState
  | UserErrorState
  | {
      readonly status: CallStatus.IDLE;
    }
  | {
      readonly status: CallStatus.LOADING;
    };

export const initialUserState: UserState = {
  status: CallStatus.IDLE,
};

function canFetchUserStates(state: UserState, action: UserAction): UserState {
  switch (action.type) {
    case UserActionTypes.SET_USER_LOADING: {
      return {
        ...state,
        status: CallStatus.LOADING,
      };
    }
    default:
      return state;
  }
}
function handleLoadingState(state: UserState, action: UserAction): UserState {
  switch (action.type) {
    case UserActionTypes.FETCH_USER_FAILURE: {
      return {
        ...state,
        status: CallStatus.FAILURE,
        errorMessage: action.payload.message,
      };
    }
    case UserActionTypes.FETCH_USER_SUCCESS: {
      return {
        ...state,
        status: CallStatus.SUCCESS,
        name: action.payload.name,
      };
    }
    default:
      return state;
  }
}
export function userReducer(
  state: UserState = initialUserState,
  action: UserAction,
): UserState {
  switch (state.status) {
    case CallStatus.SUCCESS:
    case CallStatus.FAILURE:
    case CallStatus.IDLE: {
      return canFetchUserStates(state, action);
    }
    case CallStatus.LOADING: {
      return handleLoadingState(state, action);
    }
    default:
      return state;
  }
}

export const selectUserState = createSelector(
  (state: AppState) => state.user,
  (state) => state,
);

export const selectUserStatus = createSelector(
  selectUserState,
  (state) => state.status,
);

export const selectIsUserLoading = createSelector(
  selectUserStatus,
  (status) => status === CallStatus.LOADING,
);

export const selectUserName = createSelector(selectUserState, (state) => {
  return isUserSuccessState(state) ? state.name : null;
});
