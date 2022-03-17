import {AuthorFeatureAction} from './actions';
import {AuthorModel} from '../model/author-model';
import {BaseReducer} from '@shared/ag-table/store/base-reducer';
import {AuthorState} from './state';
import {immutableReducer} from '@shared/utils/reducerUtils';

class AuthorReducer extends BaseReducer<AuthorModel, AuthorFeatureAction> {}

const reducer = new AuthorReducer();

export function moviesFeatureReducer(state = reducer.initialState(), action: any): AuthorState {
  // @ts-ignore
  return immutableReducer(reducer.cases(), state as AuthorModel, action as any);
}
