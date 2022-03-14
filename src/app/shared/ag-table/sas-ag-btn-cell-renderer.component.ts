import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'sas-ag-btn-cell',
  template: `
    <bmw-icon-button
      *ngFor="let btn of getButtons(); index as i"
      (clickEvent)="btnClickedHandler(i)"
      button="small"
      [iconClass]="btn.class"
    >
    </bmw-icon-button>
  `,
  styles: [
    `
      :host {
        display: flex;
        flex: 1;
        width: 100%;
        justify-content: flex-end;
      }
    `,
  ],
})
export class SasAgBtnCellRendererComponent implements ICellRendererAngularComp {
  private params: any;

  agInit(params: ICellRendererParams): void {
    this.params = params;
  }

  refresh(params: ICellRendererParams): boolean {
    return false;
  }

  getButtons(): any[] {
    return this.params.buttons || [];
  }

  btnClickedHandler(index: number) {
    const btn = this.getButtons()[index];
    if (btn) {
      btn.clicked(this.params.data);
    }
  }
}
