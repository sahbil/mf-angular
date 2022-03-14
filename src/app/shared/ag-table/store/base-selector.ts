import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { BaseAgTableState } from './base-state';

export abstract class BaseSelector<T> {
  abstract getStateName(): string;

  public selectCurrentItem() {
    return this.createMemoizedFeatureSelector(this.getSelectedBaseAgTableState);
  }

  public selectNewItem() {
    return this.createMemoizedFeatureSelector(this.getNewBaseAgTableState);
  }

  public selectItemList() {
    return this.createMemoizedFeatureSelector(this.getList);
  }

  public selectDraftItem() {
    return this.createMemoizedFeatureSelector(this.getDraftItem);
  }

  public selectEditedItem() {
    return this.createMemoizedFeatureSelector(this.getEditedItem);
  }

  public selectDeletedItem() {
    return this.createMemoizedFeatureSelector(this.getDeletedState);
  }

  public selectFormValidationState() {
    return this.createMemoizedFeatureSelector(this.getFormValidationState);
  }

  public selectFormResetState() {
    return this.createMemoizedFeatureSelector(this.getFormState);
  }

  protected selectFeatureState(): MemoizedSelector<object, BaseAgTableState<T>> {
    return createFeatureSelector<BaseAgTableState<T>>(this.getStateName());
  }

  protected createMemoizedFeatureSelector<Result>(
    selector: (state: BaseAgTableState<T>) => Result
  ): MemoizedSelector<object, Result> {
    return createSelector(this.selectFeatureState(), selector);
  }

  private getSelectedBaseAgTableState = (state: BaseAgTableState<T>): T | undefined => state.selectedItem;

  private getNewBaseAgTableState = (state: BaseAgTableState<T>): T | undefined => state.newItem;

  private getList = (state: BaseAgTableState<T>): T[] => state.data;

  private getDraftItem = (state: BaseAgTableState<T>): T | undefined => state.draft;

  private getEditedItem = (state: BaseAgTableState<T>): T | undefined => state.editedItem;

  private getDeletedState = (state: BaseAgTableState<T>): boolean => state.isDeleted;

  private getFormValidationState = (state: BaseAgTableState<T>): boolean => state.isValid || false;

  private getFormState = (state: BaseAgTableState<T>): boolean => state.isReset || false;
}
