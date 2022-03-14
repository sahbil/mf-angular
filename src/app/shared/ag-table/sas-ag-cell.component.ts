import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import * as moment from 'moment';
import { CellParamType } from './cell-param.model';
import { cellClassScaleValue } from '../../../features/measure/measure-box/model/datatable-config.model';

@Component({
  selector: 'sas-ag-cell',
  template: `
    <span class="sas-cell-value">{{ getValueToDisplay() }}</span>
    <i *ngIf="isAltered" class="iwp-icon-gen_status_lights"></i>
  `,
  styles: [
    `
      :host {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .sas-cell-value {
        font-size: 12px;
        line-height: 14px;
        color: #c2c2c2;
        height: 24px;
        display: flex;
        align-items: center;
      }
    `,
  ],
})
export class SasAgCellComponent implements ICellRendererAngularComp {
  private cellData!: ICellRendererParams;

  get isAltered(): boolean {
    return cellClassScaleValue(this.cellData);
  }

  agInit(params: ICellRendererParams): void {
    this.cellData = params;
  }

  refresh(params: ICellRendererParams): boolean {
    return false;
  }

  getValueToDisplay() {
    if (this.cellData?.colDef?.type) {
      switch (this.cellData.colDef.type) {
        case CellParamType.CURRENCY:
          return this.currencyFormatter();
        case CellParamType.DATE:
          return this.dateFormatter();
        default:
          return this.cellData.value;
      }
    }
    return this.cellData.value;
  }

  currencyFormatter() {
    return `€ ${this.cellData.value}`;
  }

  dateFormatter() {
    return moment(this.cellData.value).format('DD-MM-Y');
  }
}
