import {Component} from '@angular/core';
import {AbstractFormModalComponent} from '@shared/form-modal-base/abstract-form-modal.component';
import {AuthorModel} from '../../model/author-model';
import {AuthorFacadeService} from '../../services/author-facade.service';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-movies-modal',
  templateUrl: './author-modal.component.html'
})
export class AuthorModalComponent extends AbstractFormModalComponent<AuthorModel, AuthorFacadeService> {
  constructor(
    protected override readonly fb: FormBuilder,
    private readonly service: AuthorFacadeService) {
    super(fb);
  }

  getFacade(): AuthorFacadeService {
    return this.service;
  }

  initForm(): void {
    this.appForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      about: ['', Validators.required],
    });
  }

  patchForm(): void {
    if (this.appForm) {
      this.appForm.patchValue({
        id: this.model ? this.model.id : '',
        name: this.model ? this.model.name : '',
        about: this.model ? this.model.about : '',
      });
    }
  }
}
