import {AuthorModel} from '../model/author-model';
import {
  OnApiFailed,
  OnLoadingData,
  OnLoadingDataSuccess,
  OnRowAdding,
  OnRowAddingSuccess,
  OnRowDelete,
  OnRowDeletingSuccess,
  OnRowDeselect,
  OnRowEditing,
  OnRowEditSuccess,
  OnRowSelect
} from '@shared/ag-table/store/base-action';

export type AuthorFeatureAction =
  | OnRowSelect<AuthorModel>
  | OnRowDeselect<AuthorModel>
  | OnLoadingData<AuthorModel>
  | OnLoadingDataSuccess<AuthorModel>
  | OnApiFailed<AuthorModel>
  | OnRowEditing<AuthorModel>
  | OnRowEditSuccess<AuthorModel>
  | OnRowDelete<AuthorModel>
  | OnRowDeletingSuccess<AuthorModel>
  | OnRowAdding<AuthorModel>
  | OnRowAddingSuccess<AuthorModel>;
