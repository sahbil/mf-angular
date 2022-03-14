import {MoviesModel} from '../model/movies.model';
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

export type MoviesFeatureAction =
  | OnRowSelect<MoviesModel>
  | OnRowDeselect<MoviesModel>
  | OnLoadingData<MoviesModel>
  | OnLoadingDataSuccess<MoviesModel>
  | OnApiFailed<MoviesModel>
  | OnRowEditing<MoviesModel>
  | OnRowEditSuccess<MoviesModel>
  | OnRowDelete<MoviesModel>
  | OnRowDeletingSuccess<MoviesModel>
  | OnRowAdding<MoviesModel>
  | OnRowAddingSuccess<MoviesModel>;
