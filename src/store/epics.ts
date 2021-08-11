/* eslint-disable @typescript-eslint/no-explicit-any */
import { Action } from 'redux';
import { combineEpics, Epic } from 'redux-observable';
import { counterEpics } from './counter/counter.epics';
import { userEpics } from './user/user.epics';

export const rootEpic: Epic<Action<any>, Action<any>> = combineEpics(
  counterEpics,
  userEpics,
);
