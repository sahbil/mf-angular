import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { select, Store } from '@ngrx/store';
import { PageableResponse } from '../../model/pageable-response.model';
import { SasNextRootState } from '../../../store/state';
import { SasNextLoggerService } from '../../services/sas-logger.service';
import { SasConfigApiService } from '../../config/service/sas-config-api.service';
import {
  OnApiFailed,
  OnFormValidChanged,
  OnLoadingDataSuccess,
  OnResetDeleteState,
  OnResetForm,
  OnRowAddingSuccess,
  OnRowDeletingSuccess,
  OnRowDeselect,
  OnRowEditing,
  OnRowEditSuccess,
  OnRowSelect,
} from './store/base-action';
import { BaseSelector } from './store/base-selector';

export abstract class AgBaseFacadeService<T> {
  protected inEditing: boolean = false;

  protected constructor(
    protected readonly store$: Store<SasNextRootState>,
    protected readonly http: HttpClient,
    protected readonly logger: SasNextLoggerService,
    protected readonly config: SasConfigApiService
  ) {}

  abstract getUrl(): string;

  abstract getSelectorService(): BaseSelector<T>;

  public getList(): Observable<T[]> {
    return this.store$.pipe(select(this.getSelectorService().selectItemList()));
  }

  public setList(data: T[]): void {
    this.store$.dispatch(new OnLoadingDataSuccess<T>({ data }));
  }

  public selectItem(item: T | undefined): void {
    this.inEditing = true;
    this.store$.dispatch(new OnRowSelect<T>({ selectedItem: item }));
  }

  public removeSelection(): void {
    this.inEditing = false;
    this.store$.dispatch(new OnRowDeselect<T>());
  }

  public getSelectedItem(): Observable<T | undefined> {
    return this.store$.pipe(select(this.getSelectorService().selectCurrentItem()));
  }

  public getDraftItem(): Observable<T | undefined> {
    return this.store$.pipe(select(this.getSelectorService().selectDraftItem()));
  }

  public newItem(item: T): void {
    this.http
      .post<T>(this.getUrl(), item)
      .pipe(take(1))
      .subscribe(
        (newItem) => {
          this.store$.dispatch(new OnRowAddingSuccess({ newItem }));
          this.config.loadConfig();
        },
        (err) => this.store$.dispatch(new OnApiFailed({ errorMessage: err }))
      );
  }

  public getNewItem(): Observable<T | undefined> {
    return this.store$.pipe(select(this.getSelectorService().selectNewItem()));
  }

  public onEdit(item: T | undefined): void {
    this.store$.dispatch(new OnRowEditing<T>({ draft: item }));
  }

  public edit(item: T): void {
    this.http
      .put<T>(this.getUrl(), item)
      .pipe(take(1))
      .subscribe(
        (editedItem) => {
          this.store$.dispatch(new OnRowEditSuccess({ editedItem }));
          this.config.loadConfig();
        },
        (err) => this.store$.dispatch(new OnApiFailed({ errorMessage: err }))
      );
  }

  public getEditedItem(): Observable<T | undefined> {
    return this.store$.pipe(select(this.getSelectorService().selectEditedItem()));
  }

  public delete(id: number): void {
    this.http
      .delete<T>(`${this.getUrl()}/${id}`)
      .pipe(take(1))
      .subscribe(
        () => this.store$.dispatch(new OnRowDeletingSuccess<T>()),
        (error) => this.store$.dispatch(new OnApiFailed({ errorMessage: error }))
      );
  }

  public getDeletedState(): Observable<boolean> {
    return this.store$.select(this.getSelectorService().selectDeletedItem());
  }

  public setFormValidationState(state?: boolean): void {
    this.store$.dispatch(new OnFormValidChanged({ formValid: state || false }));
  }

  public getFormValidationState(): Observable<boolean> {
    return this.store$.pipe(select(this.getSelectorService().selectFormValidationState()));
  }

  public loadList(): void {
    this.http
      .get<PageableResponse<T>>(this.getUrl())
      .pipe()
      .subscribe(
        (res) => this.setList(res.content),
        (err) => this.store$.dispatch(new OnApiFailed({ errorMessage: err }))
      );
  }

  public loadPageableList(request: PageableRequestParams): Observable<PageableResponse<T>> {
    return this.http.get<PageableResponse<T>>(this.getUrl(), { params: { ...request } });
  }

  public resetForm(): void {
    this.store$.dispatch(new OnResetForm());
  }

  public isFormReset(): Observable<boolean> {
    return this.store$.pipe(select(this.getSelectorService().selectFormResetState()));
  }

  public refreshList(): void {
    this.store$.dispatch(new OnLoadingDataSuccess<T>({ data: [] }));
  }

  public resetDelete(): void {
    this.store$.dispatch(new OnResetDeleteState());
  }
}

export interface PageableRequestParams {
  page?: number;
  size?: number;
  sort?: number;
}
