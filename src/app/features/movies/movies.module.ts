import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {SharedModule} from '@shared/shared.module';
import {AgGridModule} from 'ag-grid-angular';
import {StoreModule} from '@ngrx/store';
import {MOVIES_FEATURE_STATE_NAME} from './store/state';
import {moviesFeatureReducer} from './store/reducer';
import {MoviesTableComponent} from './components/table/movies-table.component';
import {MoviesModalComponent} from './components/modal/movies-modal.component';
import {CommonModule} from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MoviesRoutingModule} from './movies-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    MoviesRoutingModule,
    AgGridModule.withComponents([]),
    StoreModule.forFeature(MOVIES_FEATURE_STATE_NAME, moviesFeatureReducer)
  ],
  declarations: [MoviesTableComponent, MoviesModalComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class MoviesModule {
}
