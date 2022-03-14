import { Action } from '@ngrx/store';
import produce, { Immutable } from 'immer';

export interface ReducerCases<State, A extends Action> {
  [type: string]: (draft: State, action: A) => void;
}

const reducerSwitch = <State, A extends Action>(cases: ReducerCases<State, A>, state: State, action: A) =>
  cases.hasOwnProperty(action.type) ? cases[action.type](state, action) : state;

export function immutableReducer<State, A extends Action>(cases: ReducerCases<State, A>, state: State, action: A) {
  return produce((s: State, a: A) => reducerSwitch(cases, s, a), state as any)(state as Immutable<State>, action);
}
