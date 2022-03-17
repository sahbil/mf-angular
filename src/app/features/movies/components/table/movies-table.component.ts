import {Component} from '@angular/core';
import {AbstractAgTableModalComponent} from '@shared/ag-table/table-modal/abstract-table-modal.component';
import {MoviesModel} from '../../model/movies.model';
import {MoviesFacadeService} from '../../services/movies-facade.service';
import {TranslateService} from '@ngx-translate/core';
import {BaseAgTableConfig} from '@shared/model/table-base.model';
import {moviesColumns} from '../../model/movies-columns.model';

@Component({
  selector: 'app-movies-table',
  templateUrl: '../../../../shared/ag-table/table-modal/base-table-modal.component.html',
  styleUrls: ['../../../../shared/ag-table/base-table.component.scss']
})
export class MoviesTableComponent extends AbstractAgTableModalComponent<MoviesModel, MoviesFacadeService> {
  constructor(private readonly service: MoviesFacadeService,
              protected override readonly trans: TranslateService) {
    super(
      new BaseAgTableConfig<MoviesModel>('Movies', moviesColumns, {
        withModal: true,
        modalSelector: 'app-movies-modal',
      }),
      trans
    );
  }

  getService(): MoviesFacadeService {
    return this.service;
  }

}
