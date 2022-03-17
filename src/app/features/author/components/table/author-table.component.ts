import {Component} from '@angular/core';
import {AuthorModel} from '../../model/author-model';
import {AuthorFacadeService} from '../../services/author-facade.service';
import {TranslateService} from '@ngx-translate/core';
import {BaseAgTableConfig} from '@shared/model/table-base.model';
import {authorColumns} from '../../model/author-columns.model';
import {AbstractAgTableComponent} from '@shared/ag-table/table-only/abstract-table.component';

@Component({
  selector: 'app-movies-table',
  templateUrl: '../../../../shared/ag-table/table-modal/base-table-modal.component.html',
  styleUrls: ['../../../../shared/ag-table/base-table.component.scss']
})
export class AuthorTableComponent extends AbstractAgTableComponent<AuthorModel, AuthorFacadeService> {
  constructor(private readonly service: AuthorFacadeService,
              protected override readonly trans: TranslateService) {
    super(
      new BaseAgTableConfig<AuthorModel>('Authors', authorColumns, {
        withModal: false,
      }),
      trans
    );
  }

  getService(): AuthorFacadeService {
    return this.service;
  }

}
