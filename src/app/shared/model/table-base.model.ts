import { Router } from '@angular/router';
import {SASTABLEVIEW, SasTableViewConfigModel} from '@shared/model/sas-table-view-config.model';

export class BaseAgTableConfig<T> {
  constructor(
    public readonly title: string,
    private readonly agColumn: any,
    public readonly crudBehaviour: CRUDBehaviour,
    public readonly showAddButton = true,
    private readonly gridOptions?: any,
    private readonly defaultColDef?: any
  ) {}

  public agTableConfig(): SasTableViewConfigModel {
    return {
      ...SASTABLEVIEW,
      columnDefs: this.agColumn,
      gridOptions: {
        ...SASTABLEVIEW.gridOptions,
        domLayout: '',
        ...this.gridOptions,
        context: {
          componentParent: this,
        },
      },
      defaultColDef: {
        ...SASTABLEVIEW.defaultColDef,
        ...this.defaultColDef,
      },
    };
  }
}

export interface CRUDBehaviour {
  withModal: boolean;
  modalSelector?: string;
  fullModal?: boolean;
  allowToDelete?: boolean;
  navigateTo?: string;
  router?: Router;
}
