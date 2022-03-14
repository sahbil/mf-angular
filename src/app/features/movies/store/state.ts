import {BaseAgTableState} from '@shared/ag-table/store/base-state';
import {MoviesModel} from '../model/movies.model';

export const MOVIES_FEATURE_STATE_NAME = 'MOVIES-STATE';

export interface MoviesState extends BaseAgTableState<MoviesModel> {
}
