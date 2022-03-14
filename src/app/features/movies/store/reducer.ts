import {MoviesFeatureAction} from './actions';
import {MoviesModel} from '../model/movies.model';
import {BaseReducer} from '@shared/ag-table/store/base-reducer';
import {MoviesState} from './state';

class MoviesReducer extends BaseReducer<MoviesModel, MoviesFeatureAction> {}

const reducer = new MoviesReducer();

export function moviesFeatureReducer(state = reducer.initialState(), action: any): MoviesState {
  // @ts-ignore
  return immutableReducer(reducer.cases(), state as MoviesModel, action as any);
}
