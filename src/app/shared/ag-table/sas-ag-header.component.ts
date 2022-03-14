import { IHeaderAngularComp } from 'ag-grid-angular';
import { Component } from '@angular/core';
import { IHeaderParams } from 'ag-grid-community';

@Component({
  selector: 'sas-ag-header',
  template: `{{ params.displayName | translate }}`,
})
export class SasAgHeaderComponent implements IHeaderAngularComp {
  params: any;

  agInit(params: IHeaderParams): void {
    this.params = params;
  }

  refresh(params: IHeaderParams): boolean {
    return false;
  }
}
