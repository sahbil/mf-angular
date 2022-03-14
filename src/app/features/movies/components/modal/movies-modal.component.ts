import {Component} from '@angular/core';
import {AbstractFormModalComponent} from '@shared/form-modal-base/abstract-form-modal.component';
import {MoviesModel} from '../../model/movies.model';
import {MoviesFacadeService} from '../../services/movies-facade.service';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-movies-modal',
  templateUrl: './movies-modal.component.html'
})
export class MoviesModalComponent extends AbstractFormModalComponent<MoviesModel, MoviesFacadeService> {
  constructor(
    protected override readonly fb: FormBuilder,
    private readonly service: MoviesFacadeService) {
    super(fb);
  }

  getFacade(): MoviesFacadeService {
    return this.service;
  }

  initForm(): void {
    this.appForm = this.fb.group({
      id: [''],
      title: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  patchForm(): void {
    if (this.appForm) {
      this.appForm.patchValue({
        id: this.model ? this.model.id : '',
        title: this.model ? this.model.title : '',
        description: this.model ? this.model.description : '',
      });
    }
  }
}
