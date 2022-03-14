import { Component } from '@angular/core';
import { ICellEditorAngularComp } from 'ag-grid-angular';
import { ICellEditorParams } from 'ag-grid-community';

@Component({
  template: `
    <bmw-datepicker
      [class]="'ag-input'"
      required="true"
      placeholder="DD-MM-YYYY"
      dateFormat="yy-mm-dd"
      showButtonBar="true"
      showWeek="true"
      [style]="{ height: '100%', width: '100%' }"
      [(ngModel)]="selectedDate"
      [ngModelOptions]="{ standalone: true }"
    ></bmw-datepicker>
  `,
})
export class SasAgDatepickerComponent implements ICellEditorAngularComp {
  public selectedDate: any;

  private params: any;

  agInit(params: ICellEditorParams): void {
    this.params = params;
    this.selectedDate = params.value;
  }

  getValue(): any {
    // Create a new date object from selection, this includes the standard timezone offset
    const date = new Date(this.selectedDate);
    // Calculate the timezone difference in ms
    const timezoneOffset = date.getTimezoneOffset() * 60000 * -1; // convert to positive value
    // Return a String of only the timezone offset altered date
    return new Date(date.getTime() + timezoneOffset).toISOString().split('T')[0];
  }
}
