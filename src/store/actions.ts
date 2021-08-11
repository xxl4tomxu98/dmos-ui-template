import { CounterAction } from './counter/counter.actions';
import { UserAction } from './user/user.actions';

export type AppAction = CounterAction | UserAction;
