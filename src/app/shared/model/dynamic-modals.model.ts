import {Type} from '@angular/core';
import {MoviesModalComponent} from '../../features/movies/components/modal/movies-modal.component';

export const MOVIES_MODAL = 'app-movies-modal';

class CrudModalComponentMap {
  componentMaps: Map<string, Type<DynamicModalFormComponent>> = new Map();

  constructor() {
    this.componentMaps.set(MOVIES_MODAL, MoviesModalComponent);
  }
}

export const dynamicComponents: Map<string, Type<DynamicModalFormComponent>> = new CrudModalComponentMap().componentMaps;

export interface DynamicModalFormComponent {
}
