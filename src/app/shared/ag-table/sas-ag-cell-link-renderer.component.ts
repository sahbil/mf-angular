import { Component, NgZone } from '@angular/core';
import { AgRendererComponent } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { SasNextRootState } from '../../../store/state';
import { OnRowSelect } from './store/base-action';

@Component({
  template: `<a (click)="navigate()">
    {{ params.value }}
  </a>`,
})
export class SasAgCellLinkRendererComponent implements AgRendererComponent {
  params: any;

  constructor(
    private readonly ngZone: NgZone,
    private readonly store$: Store<SasNextRootState>,
    private readonly router: Router
  ) {}

  agInit(params: ICellRendererParams): void {
    this.params = params;
  }

  refresh(params: ICellRendererParams): boolean {
    return false;
  }

  navigate() {
    if (this.params.routerLink && this.params.data) {
      const routerParam = this.params.routerParamField ? this.params.data[this.params.routerParamField] : '';
      this.ngZone.run(() => {
        this.router.navigate([this.params.routerLink, routerParam]);
      });
    } else if (this.params.data) {
      this.store$.dispatch(new OnRowSelect({ selectedItem: this.params.data }));
    }
  }
}
