import { Component, HostListener, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { GridApi, GridOptions, IGetRowsParams } from 'ag-grid-community';
import { take } from 'rxjs/operators';
import { AgBaseFacadeService } from '../base-facade.service';
import {BaseAgTableConfig, CRUDBehaviour} from '@shared/model/table-base.model';

@Component({
  template: '',
})
export abstract class AbstractAgTableComponent<T, U extends AgBaseFacadeService<T>> implements OnInit {
  public title: string;

  public showButton: boolean;

  addButtonText = 'global.new_row';

  crudBehaviour!: CRUDBehaviour;

  rowData: T[] = [];

  gridOptions!: GridOptions;

  protected facade!: U;

  protected selectedList!: any[];

  private readonly _runtimeCompilerData: any;

  protected constructor(
    protected readonly tableConfig: BaseAgTableConfig<T>,
    protected readonly trans: TranslateService
  ) {
    this._runtimeCompilerData = tableConfig.agTableConfig();
    this.translateHeader();
    this.gridOptions = { ...this._runtimeCompilerData.gridOptions };
    this.title = tableConfig.title;
    this.showButton = tableConfig.showAddButton;
    this.crudBehaviour = tableConfig.crudBehaviour;
  }

  public get runtimeCompilerData() {
    return this._runtimeCompilerData;
  }

  protected _gridApi!: GridApi;

  public get gridApi() {
    if (!this._gridApi && this.gridOptions?.api) {
      this._gridApi = this.gridOptions.api;
    }
    return this._gridApi;
  }

  protected _selectedRow?: T;

  public get selectedRow() {
    return this._selectedRow;
  }

  protected _disableDeleteBtn = true;

  public get disableDeleteBtn(): boolean {
    return this._disableDeleteBtn;
  }

  public translateHeader() {
    this._runtimeCompilerData.columnDefs.forEach((def: any) => {
      def.headerName = this.trans.instant(def.headerName);
    });
  }

  abstract getService(): U;

  ngOnInit(): void {
    this.facade = this.getService();
  }

  refreshCell() {
    this.gridApi.setColumnDefs(this.runtimeCompilerData.columnDefs);
    const dataSource = {
      getRows(params: any) {
        params.successCallback([], 0);
      },
    };
    this.gridApi.setDatasource(dataSource);
  }

  public getRowNodeId(data: any) {
    return data.id;
  }

  @HostListener('window:resize', ['$event'])
  public onResize(event: any) {
    if (this.gridApi) {
      this.gridApi.resetRowHeights();
      this.gridApi.sizeColumnsToFit();
    }
  }

  public onFirstDataRendered(params: any) {
    if (this.gridApi) {
      this.gridApi.sizeColumnsToFit();
      this.gridApi.resetRowHeights();
    }
  }

  public onGridReady(params: any) {
    this._gridApi = params.api;
    this.loadTableData();
  }

  public loadTableData() {
    this.refreshCell();
    this.gridApi.setDatasource(this.serverSideDatasource());
  }

  openOrRouting() {
    if (this.crudBehaviour.router) {
      this.crudBehaviour.router.navigate([this.crudBehaviour.navigateTo]);
    }
  }

  public search() {
    throw new Error('Generic search not implemented for abstract table component');
  }

  translate(text: string) {
    return this.trans.get(text);
  }

  getTitle(): string {
    return this.title;
  }

  private serverSideDatasource() {
    return {
      getRows: (rowParams: IGetRowsParams) => {
        this.facade
          .loadPageableList({
            page: this.calculatePageNumber(rowParams.startRow),
            size: this.runtimeCompilerData.paginationPageSize,
          })
          .pipe(take(1))
          .subscribe((data) => {
            this.rowData = this.rowData.concat(data.content);
            this.facade.setList(this.rowData);
            rowParams.successCallback(data.content, data.totalElements);
          });
      },
    };
  }

  private calculatePageNumber(startRow: number) {
    return startRow > 0 ? startRow / this.runtimeCompilerData.paginationPageSize : 0;
  }
}
