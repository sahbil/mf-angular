import {Directive, Input, OnInit, ViewContainerRef} from '@angular/core';
import {DynamicComponentFactoryService} from '../services/dynamic-component-factory.service';

@Directive({
  selector: '[dynamicModal]',
})
export class DynamicModalDirective implements OnInit {
  @Input()
  dynamicModal = '';

  constructor(public viewContainerRef: ViewContainerRef,
              private readonly service: DynamicComponentFactoryService) {
  }

  ngOnInit(): void {
    this.service.addDynamicComponent(this.viewContainerRef, this.dynamicModal);
  }
}
