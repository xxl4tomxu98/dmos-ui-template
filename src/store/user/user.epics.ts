import { combineEpics, Epic, ofType } from 'redux-observable';
import { catchError, from, mapTo, mergeMap, of, switchMap } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { AppAction } from '../actions';
import { AppState } from '../reducers';
import {
  fetchUserFailure,
  fetchUserSuccess,
  setUserLoading,
  UserActionTypes,
} from './user.actions';

export const userLoadingEpic: Epic<AppAction, AppAction, AppState> = (
  actions$,
) => {
  return actions$.pipe(
    ofType(UserActionTypes.FETCH_USER),
    mapTo(setUserLoading()),
  );
};
export const fetchUserEpic: Epic<AppAction, AppAction, AppState> = (
  actions$,
) => {
  return actions$.pipe(
    ofType(UserActionTypes.SET_USER_LOADING),
    switchMap(() => {
      return fromFetch('https://api.kanye.rest/').pipe(
        mergeMap((res: Response) => {
          return from<Promise<{ quote: string }>>(res.json()).pipe(
            mergeMap((res) => of(fetchUserSuccess(res.quote))),
          );
        }),
        catchError((error: Error) => {
          return of(fetchUserFailure(error.message));
        }),
      );
    }),
  );
};

export const userEpics = combineEpics(fetchUserEpic, userLoadingEpic);
