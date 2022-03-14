import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { BaseAgTableConfig } from '../../../model/table-base.model';
import { AgBaseFacadeService } from '../base-facade.service';
import { AbstractAgTableComponent } from '../table-only/abstract-table.component';

@Component({ template: '' })
export abstract class AbstractAgTableModalComponent<T, U extends AgBaseFacadeService<T>>
  extends AbstractAgTableComponent<T, U>
  implements OnInit, OnDestroy
{
  draftSubscription!: Subscription;

  selectedItemSubscription!: Subscription;

  editedItemSubscription!: Subscription;

  selectNewItemSubscription!: Subscription;

  selectFormValidationSubscription!: Subscription;

  disablePrimaryBtn = true;

  isEditMode = false;

  draft!: T | undefined;

  protected constructor(
    protected readonly tableConfig: BaseAgTableConfig<T>,
    protected readonly trans: TranslateService
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

  abstract getModalCreateTitle(): string;

  abstract getModalEditTitle(): string;

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

  openOrRouting() {
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

  public ngOnInit() {
    super.ngOnInit();
    this.initStoreListener();
  }

  ngOnDestroy(): void {
    if (this.editedItemSubscription) {
      this.editedItemSubscription.unsubscribe();
    }
    if (this.draftSubscription) {
      this.draftSubscription.unsubscribe();
    }
    if (this.selectNewItemSubscription) {
      this.selectNewItemSubscription.unsubscribe();
    }
    if (this.selectedItemSubscription) {
      this.selectedItemSubscription.unsubscribe();
    }
    if (this.selectFormValidationSubscription) {
      this.selectFormValidationSubscription.unsubscribe();
    }
  }

  private initStoreListener() {
    this.facade.refreshList();
    this.editedItemSubscription = this.facade
      .getEditedItem()
      .pipe(filter((item) => item !== undefined))
      .subscribe(() => {
        this.loadTableData();
        this.closeDialog();
      });

    this.selectNewItemSubscription = this.facade
      .getNewItem()
      .pipe(filter((item) => item !== undefined))
      .subscribe(() => {
        this.loadTableData();
        this._showFormDialog = false;
        this.closeDialog();
      });

    this.draftSubscription = this.facade
      .getDraftItem()
      .pipe(filter((item) => item !== undefined))
      .subscribe((draft) => (this.draft = draft));

    this.selectedItemSubscription = this.facade
      .getSelectedItem()
      .pipe(filter((item) => item !== undefined))
      .subscribe(() => this.openEditDialog());

    this.selectFormValidationSubscription = this.facade.getFormValidationState().subscribe((formState) => {
      this.disablePrimaryBtn = !formState;
    });
  }
}
