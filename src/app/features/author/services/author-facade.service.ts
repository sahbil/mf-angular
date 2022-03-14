import {Injectable} from '@angular/core';
import {AgBaseFacadeService} from '@shared/ag-table/base-facade.service';
import {AuthorModel} from '../model/author-model';
import {BaseSelector} from '@shared/ag-table/store/base-selector';
import {environment} from '../../../../environments/environment';
import {Store} from '@ngrx/store';
import {AppRootState} from '@shared/store/state';
import {HttpClient} from '@angular/common/http';
import {LoggerService} from '@shared/services/logger.service';
import {AuthorSelector} from '../store/selector';

@Injectable({
  providedIn: 'root'
})
export class AuthorFacadeService extends AgBaseFacadeService<AuthorModel> {

  constructor(
    protected override readonly store$: Store<AppRootState>,
    protected override readonly http: HttpClient,
    protected override readonly logger: LoggerService,
    private readonly selectorService: AuthorSelector
  ) {
    super(store$, http, logger);
  }

  getSelectorService(): BaseSelector<AuthorModel> {
    return this.selectorService;
  }

  getUrl(): string {
    return `${environment.baseUrl}/author`;
  }

}
