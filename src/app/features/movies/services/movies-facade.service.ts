import {Injectable} from '@angular/core';
import {AgBaseFacadeService} from '@shared/ag-table/base-facade.service';
import {MoviesModel} from '../model/movies.model';
import {BaseSelector} from '@shared/ag-table/store/base-selector';
import {environment} from '../../../../environments/environment';
import {Store} from '@ngrx/store';
import {AppRootState} from '@shared/store/state';
import {HttpClient} from '@angular/common/http';
import {LoggerService} from '@shared/services/logger.service';
import {MoviesSelector} from '../store/selector';

@Injectable({
  providedIn: 'root'
})
export class MoviesFacadeService extends AgBaseFacadeService<MoviesModel> {

  constructor(
    protected override readonly store$: Store<AppRootState>,
    protected override readonly http: HttpClient,
    protected override readonly logger: LoggerService,
    private readonly selectorService: MoviesSelector
  ) {
    super(store$, http, logger);
  }

  getSelectorService(): BaseSelector<MoviesModel> {
    return this.selectorService;
  }

  getUrl(): string {
    return `${environment.baseUrl}/movies`;
  }

}
