import { ColDef } from 'ag-grid-community';
import { SasAgDraggableCellComponent } from './sas-ag-draggable-cell.component';
import { SasAgCellComponent } from './sas-ag-cell.component';
import { SasAgDatepickerComponent } from './sas-ag-datepicker.component';

export interface SasTableViewConfigModel {
  icons?: any;
  frameworkComponents?: any;
  columnDefs: ColDef[];
  defaultColDef: ColDef;
  gridOptions?: any;
  data?: any[];
  sideBar?: any;
  statusBar?: any;
  rowModelType?: any;
  serverSideStoreType?: any;
  paginationPageSize?: any;
  cacheBlockSize?: any;
  rowBuffer?: any;
  infiniteInitialRowCount?: any;
  cacheOverflowSize?: any;
  maxConcurrentDatasourceRequests?: any;
  maxBlocksInCache?: any;
  pagination?: any;
}

export const SASTABLEVIEW: SasTableViewConfigModel = {
  data: [],
  columnDefs: [],
  gridOptions: {
    ensureDomOrder: true,
    suppressMovableColumns: false,
    rowMultiSelectWithClick: true,
    rowSelection: 'single',
    suppressRowDeselection: true,
    rowHeight: 32,
    headerHeight: 32,
    enableRangeSelection: true,
    enableRangeHandle: true,
    rowGroupPanelShow: 'onlyWhenGrouping',
    popupParent: document.querySelector('#sas-body'),
    domLayout: 'autoHeight',
  },
  icons: {
    groupExpanded: ' ',
    groupContracted: ' ',
  },
  frameworkComponents: {
    draggableCell: SasAgDraggableCellComponent,
    sasCellRenderer: SasAgCellComponent,
    sasDateRenderer: SasAgDatepickerComponent,
  },
  defaultColDef: {
    flex: 1,
    sortable: true,
    unSortIcon: true,
    editable: true,
    enableRowGroup: true,
    enablePivot: true,
    enableValue: true,
    filter: 'agTextColumnFilter',
    autoHeight: true,
    resizable: true,
  },
  sideBar: {
    toolPanels: [
      {
        id: 'columns',
        labelDefault: 'Columns',
        labelKey: 'columns',
        iconKey: 'columns',
        toolPanel: 'agColumnsToolPanel',
        toolPanelParams: {
          suppressRowGroups: true,
          suppressValues: true,
          suppressPivots: true,
          suppressPivotMode: true,
          suppressColumnFilter: true,
          suppressColumnSelectAll: true,
          suppressColumnExpandAll: true,
        },
      },
    ],
    defaultToolPanel: undefined,
  },
  statusBar: {
    statusPanels: [
      {
        statusPanel: 'agTotalAndFilteredRowCountComponent',
        align: 'left',
      },
      {
        statusPanel: 'agTotalRowCountComponent',
        align: 'center',
      },
      { statusPanel: 'agFilteredRowCountComponent' },
      { statusPanel: 'agSelectedRowCountComponent' },
      { statusPanel: 'agAggregationComponent' },
    ],
  },
  rowModelType: 'infinite',
  serverSideStoreType: 'partial',
  paginationPageSize: 100,
  cacheBlockSize: 10,
  rowBuffer: 0,
  infiniteInitialRowCount: 1,
  cacheOverflowSize: 2,
  maxConcurrentDatasourceRequests: 2,
  maxBlocksInCache: 2,
  pagination: true,
};

export const ruleTableConfig = () => ({
  ...SASTABLEVIEW,
});
