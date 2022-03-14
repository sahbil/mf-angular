import {Injectable} from '@angular/core';
import {BaseSelector} from '@shared/ag-table/store/base-selector';
import {MoviesModel} from '../model/movies.model';
import {MOVIES_FEATURE_STATE_NAME} from './state';

@Injectable({
  providedIn: 'root'
})
export class MoviesSelector extends BaseSelector<MoviesModel> {
  getStateName(): string {
    return MOVIES_FEATURE_STATE_NAME;
  }
}
