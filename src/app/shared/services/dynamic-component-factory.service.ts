import { ComponentFactoryResolver, Inject, Injectable, Type, ViewContainerRef } from '@angular/core';
import { dynamicComponents, DynamicModalFormComponent } from '../model/dynamic-modals.model';

@Injectable({
  providedIn: 'root',
})
export class DynamicComponentFactoryService {
  constructor(@Inject(ComponentFactoryResolver) private readonly factoryResolver: ComponentFactoryResolver) {}

  addDynamicComponent(viewContainerRef: ViewContainerRef, modal: string) {
    const modalComponent = this.getModalComponent(modal);
    viewContainerRef.clear();
    if (modalComponent !== undefined) {
      const factory = this.factoryResolver.resolveComponentFactory(modalComponent);
      const componentRef = viewContainerRef.createComponent(factory);
      componentRef.changeDetectorRef.detectChanges();
    }
  }

  public getModalComponent(modal: string): Type<DynamicModalFormComponent> | undefined {
    if (dynamicComponents.has(modal)) {
      return dynamicComponents.get(modal);
    }

    return undefined;
  }
}
