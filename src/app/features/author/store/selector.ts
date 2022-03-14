import {Injectable} from '@angular/core';
import {BaseSelector} from '@shared/ag-table/store/base-selector';
import {AuthorModel} from '../model/author-model';
import {AUTHOR_FEATURE_STATE_NAME} from './state';

@Injectable({
  providedIn: 'root'
})
export class AuthorSelector extends BaseSelector<AuthorModel> {
  getStateName(): string {
    return AUTHOR_FEATURE_STATE_NAME;
  }
}
