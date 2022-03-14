import { Action } from '@ngrx/store';
import { ReducerCases } from '../../../utils/reducerUtils';
import { BaseAgTableState } from './base-state';
import {
  AgTableActionTypes,
  OnApiFailed,
  OnFormValidChanged,
  OnLoadingDataSuccess,
  OnResetDeleteState,
  OnRowAdding,
  OnRowAddingSuccess,
  OnRowDelete,
  OnRowEditing,
  OnRowEditSuccess,
  OnRowSelect,
} from './base-action';

export abstract class BaseReducer<T, A extends Action> {
  public cases(): ReducerCases<BaseAgTableState<T>, A> {
    return {
      [AgTableActionTypes.ON_DESELECTED]: this.deselectItem.bind(this),
      // @ts-ignore
      [AgTableActionTypes.ON_SELECTED]: this.selectItem.bind(this),
      [AgTableActionTypes.ON_LOADING_DATA]: (draft) => {
        draft.isLoading = true;
      },
      // @ts-ignore
      [AgTableActionTypes.LOADING_DATA_SUCCESS]: (draft, action: OnLoadingDataSuccess<T>) => {
        draft.isLoading = false;
        draft.editedItem = undefined;
        draft.data = action.payload.data;
      },
      // @ts-ignore
      [AgTableActionTypes.RESET_DELETE_STATE]: (draft, action: OnResetDeleteState<T>) => {
        draft.isDeleted = false;
      },
      // @ts-ignore
      [AgTableActionTypes.ON_API_FAILED]: (draft, action: OnApiFailed<T>) => {
        draft.isLoading = false;
        draft.errorMessage = action.payload.errorMessage;
        draft.data = [];
      },
      // @ts-ignore
      [AgTableActionTypes.ON_EDITING]: this.setDraft.bind(this),
      // @ts-ignore
      [AgTableActionTypes.EDITING_SUCCESS]: (draft: BaseAgTableState<T>, action: OnRowEditSuccess<T>) => {
        draft.selectedItem = undefined;
        draft.editedItem = action.payload.editedItem;
        draft.draft = undefined;
      },
      // @ts-ignore
      [AgTableActionTypes.ON_DELETING]: this.selectItem.bind(this),
      [AgTableActionTypes.DELETING_SUCCESS]: (draft: BaseAgTableState<T>) => {
        draft.selectedItem = undefined;
        draft.isDeleted = true;
      },
      // @ts-ignore
      [AgTableActionTypes.ON_CREATING]: this.newItem.bind(this),
      // @ts-ignore
      [AgTableActionTypes.CREATING_SUCCESS]: this.newItem.bind(this),
      // @ts-ignore
      [AgTableActionTypes.ON_FORM_STATE_CHANGED]: (draft, action: OnFormValidChanged) => {
        draft.isValid = action.payload.formValid;
      },
      // @ts-ignore
      [AgTableActionTypes.ON_RESET_FORM]: (draft) => {
        this.reset(draft);
        draft.isValid = false;
        draft.isReset = true;
        draft.selectedItem = undefined;
      },
    };
  }

  public initialState(): BaseAgTableState<T> {
    return {
      isLoading: false,
      isDeleted: false,
      data: [],
    };
  }

  private reset(draft: BaseAgTableState<T>) {
    draft.isLoading = false;
    draft.isDeleted = false;
    draft.editedItem = undefined;
  }

  private selectItem(draft: BaseAgTableState<T>, action: OnRowSelect<T> | OnRowDelete<T>) {
    this.reset(draft);
    draft.isReset = false;
    draft.selectedItem = action.payload.selectedItem;
  }

  private deselectItem(draft: BaseAgTableState<T>) {
    draft.selectedItem = undefined;
  }

  private setDraft(draft: BaseAgTableState<T>, action: OnRowEditing<T>) {
    this.reset(draft);
    draft.isReset = false;
    draft.draft = action.payload.draft;
  }

  private newItem(draft: BaseAgTableState<T>, action: OnRowAdding<T> | OnRowAddingSuccess<T>) {
    draft.isLoading = false;
    draft.draft = undefined;
    draft.newItem = action.payload.newItem;
  }
}
