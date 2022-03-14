import { AfterViewInit, Component, ElementRef, HostBinding, ViewChild } from '@angular/core';
import { ICellRendererParams } from 'ag-grid-community';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'sas-draggable-cell',
  template: ` <div class="sas-draggable-cell">
    <span class="cell-value">{{ cellValue }}</span>
    <span class="iwp-icon-ci_subtitle_on" #dragRef></span>
  </div>`,
  styles: [
    `
      .sas-draggable-cell {
        display: flex;
        width: 100%;
        justify-content: space-between;
        align-items: center;
      }
    `,
  ],
})
export class SasAgDraggableCellComponent implements AfterViewInit, ICellRendererAngularComp {
  @HostBinding('class')
  class = 'sas-draggable-cell-renderer';

  cellValue!: string;

  @ViewChild('dragRef')
  private dragRef!: ElementRef;

  private cellRendererParams!: ICellRendererParams;

  agInit(params: ICellRendererParams): void {
    this.cellRendererParams = params;
    this.cellValue = params.value;
  }

  ngAfterViewInit(): void {
    this.cellRendererParams.registerRowDragger(this.dragRef.nativeElement, 0);
  }

  refresh(params: ICellRendererParams): boolean {
    return false;
  }
}
