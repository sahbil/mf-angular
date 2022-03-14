import { Action } from '@ngrx/store';

export enum AgTableActionTypes {
    ON_SELECTED = '[AG-TABLE] ON SELECTED',
    ON_DESELECTED = '[AG-TABLE] ON UNSELECTED',
    ON_LOADING_DATA = '[AG-TABLE] ON LOADING DATA',
    LOADING_DATA_SUCCESS = '[AG-TABLE] LOADING DATA SUCCESS',
    ON_EDITING = '[AG-TABLE] EDITING',
    EDITING_SUCCESS = '[AG-TABLE] ITEM EDITED',
    ON_DELETING = '[AG-TABLE] DELETING',
    DELETING_SUCCESS = '[AG-TABLE] ITEM DELETED',
    RESET_DELETE_STATE = '[AG-TABLE] RESET DELETE STATE',
    ON_CREATING = '[AG-TABLE] CREATING',
    CREATING_SUCCESS = '[AG-TABLE] ITEM CREATED',
    ON_API_FAILED = '[AG-TABLE] API FAILED',
    ON_FORM_STATE_CHANGED = '[AG-TABLE] ON FORM STATE CHANGED',
    ON_RESET_FORM = '[AG-TABLE] ON RESET FORM',
}

export class OnRowSelect<T> implements Action {
    readonly type = AgTableActionTypes.ON_SELECTED;

    constructor(public payload: { selectedItem: T | undefined }) { }
}

export class OnRowDeselect<T> implements Action {
    readonly type = AgTableActionTypes.ON_DESELECTED;
}

export class OnLoadingData<T> implements Action {
    readonly type = AgTableActionTypes.ON_LOADING_DATA;
}

export class OnLoadingDataSuccess<T> implements Action {
    readonly type = AgTableActionTypes.LOADING_DATA_SUCCESS;

    constructor(public payload: { data: T[] }) { }
}

export class OnApiFailed<T> implements Action {
    readonly type = AgTableActionTypes.ON_API_FAILED;

    constructor(public payload: { errorMessage: any }) { }
}

export class OnRowEditing<T> implements Action {
    readonly type = AgTableActionTypes.ON_EDITING;

    constructor(public payload: { draft: T | undefined }) { }
}

export class OnRowEditSuccess<T> implements Action {
    readonly type = AgTableActionTypes.EDITING_SUCCESS;

    constructor(public payload: { editedItem: T }) { }
}

export class OnRowDelete<T> implements Action {
    readonly type = AgTableActionTypes.ON_DELETING;

    constructor(public payload: { selectedItem: T }) { }
}

export class OnRowDeletingSuccess<T> implements Action {
    readonly type = AgTableActionTypes.DELETING_SUCCESS;
}

export class OnRowAdding<T> implements Action {
    readonly type = AgTableActionTypes.ON_CREATING;

    constructor(public payload: { newItem: T }) { }
}

export class OnRowAddingSuccess<T> implements Action {
    readonly type = AgTableActionTypes.CREATING_SUCCESS;

    constructor(public payload: { newItem: T }) { }
}

export class OnFormValidChanged<T> implements Action {
    readonly type = AgTableActionTypes.ON_FORM_STATE_CHANGED;

    constructor(public payload: { formValid: boolean }) { }
}

export class OnResetForm<T> implements Action {
    readonly type = AgTableActionTypes.ON_RESET_FORM;
}

export class OnResetDeleteState<T> implements Action {
    readonly type = AgTableActionTypes.RESET_DELETE_STATE;
}
