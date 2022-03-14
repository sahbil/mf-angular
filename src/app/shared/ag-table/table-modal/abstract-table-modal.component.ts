import {Component, OnDestroy, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {filter, takeUntil} from 'rxjs/operators';
import {AgBaseFacadeService} from '../base-facade.service';
import {AbstractAgTableComponent} from '../table-only/abstract-table.component';
import {BaseAgTableConfig} from '../../model/table-base.model';
import {Subject} from 'rxjs';

@Component({template: ''})
export abstract class AbstractAgTableModalComponent<T, U extends AgBaseFacadeService<T>>
  extends AbstractAgTableComponent<T, U>
  implements OnInit, OnDestroy {

  notifier = new Subject<void>()

  disablePrimaryBtn = true;

  isEditMode = false;

  draft!: T | undefined;

  protected constructor(
    protected override readonly tableConfig: BaseAgTableConfig<T>,
    protected override readonly trans: TranslateService
  ) {
    super(tableConfig, trans);
  }

  private _showFormDialog = false;

  public get showFormDialog() {
    return this._showFormDialog;
  }

  public get isEdit() {
    return this.isEditMode;
  }

  public save() {
    if (this.isEdit && this.draft) {
      this.facade.edit(this.draft);
    } else if (this.draft) {
      this.facade.newItem(this.draft);
    }
  }

  public closeDialog() {
    this._showFormDialog = false;
    this.facade.resetForm();
  }

  public onRowEditingStopped(params: any) {
    this.facade.edit(params.node.data);
  }

  public onBtDelete() {
    this.selectedList = this._gridApi.getSelectedNodes();
    if (!this.selectedList || this.selectedList.length === 0) {
      return;
    }
    const selectedId: number[] = this.selectedList.map((item) => item.data.id);
    this.facade.delete(selectedId[0]);
  }

  override openOrRouting() {
    this.openCreateDialog();
  }

  openCreateDialog() {
    this._showFormDialog = true;
    this._selectedRow = undefined;
    this.isEditMode = false;
    this.facade.removeSelection();
  }

  openEditDialog() {
    this.isEditMode = true;
    this._showFormDialog = true;
  }

  public override ngOnInit() {
    super.ngOnInit();
    this.initStoreListener();
  }

  ngOnDestroy(): void {
    this.notifier.next();
    this.notifier.complete();
  }

  private initStoreListener() {
    this.facade.refreshList();
    this.facade
      .getEditedItem()
      .pipe(
        filter((item) => item !== undefined),
        takeUntil(this.notifier)
      )
      .subscribe(() => {
        this.loadTableData();
        this.closeDialog();
      });

    this.facade
      .getNewItem()
      .pipe(
        filter((item) => item !== undefined),
        takeUntil(this.notifier)
      )
      .subscribe(() => {
        this.loadTableData();
        this._showFormDialog = false;
        this.closeDialog();
      });

    this.facade
      .getDraftItem()
      .pipe(
        filter((item) => item !== undefined),
        takeUntil(this.notifier)
      )
      .subscribe((draft) => (this.draft = draft));

    this.facade
      .getSelectedItem()
      .pipe(
        filter((item) => item !== undefined),
        takeUntil(this.notifier)
      )
      .subscribe(() => this.openEditDialog());

    this.facade.getFormValidationState()
      .pipe(takeUntil(this.notifier))
      .subscribe((formState) => {
        this.disablePrimaryBtn = !formState;
      });
  }
}
