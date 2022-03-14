import {Type} from '@angular/core';
import {AppComponent} from '../../app.component';

export const MEASURE_MODAL = 'app-home';

class CrudModalComponentMap {
  componentMaps: Map<string, Type<DynamicModalFormComponent>> = new Map();

  constructor() {
    this.componentMaps.set(MEASURE_MODAL, AppComponent);
  }
}

export const dynamicComponents: Map<string, Type<DynamicModalFormComponent>> = new CrudModalComponentMap().componentMaps;

export interface DynamicModalFormComponent {
}
