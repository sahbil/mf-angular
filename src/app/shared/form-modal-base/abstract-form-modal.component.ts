import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Subject} from 'rxjs';
import {AgBaseFacadeService} from '@shared/ag-table/base-facade.service';
import {takeUntil} from 'rxjs/operators';

@Component({template: ''})
export abstract class AbstractFormModalComponent<T, U extends AgBaseFacadeService<T>> implements OnInit, OnDestroy {
  public appForm!: FormGroup;

  notifier = new Subject<void>();

  public model!: T | undefined | null;

  protected facade!: U;

  constructor(protected readonly fb: FormBuilder) {
  }

  abstract initForm(): void;

  abstract getFacade(): U;

  abstract patchForm(): void;

  public ngOnInit(): void {
    this.facade = this.getFacade();
    this.initForm();

    this.getFacade()
      .getSelectedItem()
      .pipe(takeUntil(this.notifier))
      .subscribe((data) => {
        this.model = data;
        this.patchForm();
      });

    this.getFacade()
      .isFormReset()
      .pipe(takeUntil(this.notifier))
      .subscribe((isReset) => {
        if (isReset) {
          this.appForm.reset({});
        }
      });

    // Reset modal form after creating new item
    this.getFacade()
      .getNewItem()
      .pipe(takeUntil(this.notifier))
      .subscribe(() => {
        this.model = undefined;
        this.patchForm();
      });

    this.appForm.valueChanges.subscribe((formData) => {
      if (!this.appForm.valid) {
        this.facade.setFormValidationState(false);
        this.getFacade().onEdit(undefined);
      } else {
        this.facade.setFormValidationState(true);
        this.getFacade().onEdit(formData);
      }
    });
  }

  ngOnDestroy(): void {
    this.notifier.next();
    this.notifier.complete();
  }
}
