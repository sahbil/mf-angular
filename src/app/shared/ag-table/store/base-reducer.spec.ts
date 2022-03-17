import {BaseReducer} from './base-reducer';
import * as fromActions from './base-action';
import {BaseAgTableState} from './base-state';
import {immutableReducer} from '@shared/utils/reducerUtils';

type MockAction =
  | fromActions.OnRowSelect<string>
  | fromActions.OnRowDeselect<string>
  | fromActions.OnLoadingData<string>
  | fromActions.OnLoadingDataSuccess<string>
  | fromActions.OnApiFailed<string>
  | fromActions.OnRowEditing<string>
  | fromActions.OnRowEditSuccess<string>
  | fromActions.OnRowDelete<string>
  | fromActions.OnRowDeletingSuccess<string>
  | fromActions.OnRowAdding<string>
  | fromActions.OnRowAddingSuccess<string>;

export class MockReducer extends BaseReducer<string, MockAction> {
}

const mockReducerInstance = new MockReducer();

export const mockState: BaseAgTableState<string> = {
  isLoading: false,
  isDeleted: false,
  data: [],
};

const testState = {...mockState};

const mockReducer: any = (state = testState, action: MockAction) =>
  immutableReducer(mockReducerInstance.cases(), state as BaseAgTableState<string>, action as MockAction);

describe('Store > Base > Reducer', () => {
  it('should returns default state', () => {
    expect(mockReducerInstance.initialState()).toEqual(testState);
  });

  it('should add draft item to the state', () => {
    const payload = {draft: 'boo'};
    const state = mockReducer(testState, new fromActions.OnRowEditing(payload));
    expect(state.draft).toBe('boo');
  });

  it('should reset draft after editing success', () => {
    const payload = {editedItem: 'boo'};
    const state = mockReducer(testState, new fromActions.OnRowEditSuccess(payload));
    expect(state.draft).toBeFalsy();
    expect(state.selectedItem).toBeFalsy();
    expect(state.editedItem).toEqual('boo');
  });

  it('should put the new item to the state and remove the draft', () => {
    const payload = {newItem: 'boo'};
    const state = mockReducer(testState, new fromActions.OnRowAdding(payload));
    expect(state.newItem).toBe('boo');
    expect(state.draft).toBeFalsy();
  });

  it('should reset state after creating', () => {
    const state = mockReducer(testState, new fromActions.OnRowAddingSuccess({newItem: 'new'}));
    expect(state.newItem).toBe('new');
    expect(state.isLoading).toBeFalsy();
  });

  it('should put the selected item to the state', () => {
    const payload = {selectedItem: 'boo'};
    const spyReset = spyOn<any>(mockReducerInstance, 'reset').and.callThrough();
    const state = mockReducer(testState, new fromActions.OnRowSelect(payload));
    expect(state.selectedItem).toBe('boo');
    expect(spyReset).toHaveBeenCalled();
  });

  it('should put remove selected item from the state', () => {
    const state = mockReducer(testState, new fromActions.OnRowDeselect());
    expect(state.selectedItem).toBeFalsy();
  });

  it('should handle isLoading state', () => {
    const state = mockReducer(testState, new fromActions.OnLoadingData());
    expect(state.isLoading).toBeTrue();
  });

  it('should update data', () => {
    const state = mockReducer(testState, new fromActions.OnLoadingDataSuccess({data: ['foo']}));
    expect(state.isLoading).toBeFalsy();
    expect(state.editedItem).toBeFalsy();
    expect(state.data.length).toEqual(1);
  });

  it('should add errorMessage on api failed', () => {
    const state = mockReducer(testState, new fromActions.OnApiFailed({errorMessage: 'Oeps'}));
    expect(state.isLoading).toBeFalsy();
    expect(state.errorMessage).toEqual('Oeps');
    expect(state.data.length).toEqual(0);
  });

  it('should set selected state for deleting', () => {
    const state = mockReducer(testState, new fromActions.OnRowDelete({selectedItem: 'boo'}));
    expect(state.isReset).toBeFalsy();
    expect(state.selectedItem).toEqual('boo');
  });

  it('should reset delete state after deleting', () => {
    const state = mockReducer(testState, new fromActions.OnRowDeletingSuccess());
    expect(state.isDeleted).toBeTrue();
    expect(state.selectedItem).toBeFalsy();
  });

  it('should update form validation state', () => {
    const state = mockReducer(testState, new fromActions.OnFormValidChanged({formValid: true}));
    expect(state.isValid).toBeTrue();
  });

  it('should update form reset state', () => {
    const state = mockReducer(testState, new fromActions.OnResetForm());
    expect(state.isReset).toBeTrue();
    expect(state.isValid).toBeFalsy();
  });

  it('should reset the delete state', () => {
    const state = mockReducer(testState, new fromActions.OnResetDeleteState());
    expect(state.isDeleted).toBeFalsy();
  });
});
