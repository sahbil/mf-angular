import {BaseAgTableState} from '@shared/ag-table/store/base-state';
import {AuthorModel} from '../model/author-model';

export const AUTHOR_FEATURE_STATE_NAME = 'AUTHOR-STATE';

export interface AuthorState extends BaseAgTableState<AuthorModel> {
}
