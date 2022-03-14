export interface BaseAgTableState<T> {
  selectedItem?: T | undefined;
  editedItem?: T;
  draft?: T;
  newItem?: T;
  isValid?: boolean;
  isReset?: boolean;
  isLoading: boolean;
  isDeleted: boolean;
  errorMessage?: any;
  data: T[];
}
