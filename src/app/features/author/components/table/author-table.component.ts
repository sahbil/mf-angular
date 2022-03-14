import {Component} from '@angular/core';
import {AbstractAgTableModalComponent} from '@shared/ag-table/table-modal/abstract-table-modal.component';
import {AuthorModel} from '../../model/author-model';
import {AuthorFacadeService} from '../../services/author-facade.service';
import {TranslateService} from '@ngx-translate/core';
import {BaseAgTableConfig} from '@shared/model/table-base.model';
import {authorColumns} from '../../model/author-columns.model';

@Component({
  selector: 'app-movies-table',
  templateUrl: '../../../../shared/ag-table/table-modal/base-table-modal.component.html'
})
export class AuthorTableComponent extends AbstractAgTableModalComponent<AuthorModel, AuthorFacadeService> {
  constructor(private readonly service: AuthorFacadeService,
              protected override readonly trans: TranslateService) {
    super(
      new BaseAgTableConfig<AuthorModel>('Movies', authorColumns, {
        withModal: true,
        modalSelector: 'app-movies-modal',
      }),
      trans
    );
  }

  getService(): AuthorFacadeService {
    return this.service;
  }

}
