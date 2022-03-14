import {NgModule} from '@angular/core';
import {SharedModule} from '@shared/shared.module';
import {AgGridModule} from 'ag-grid-angular';
import {StoreModule} from '@ngrx/store';
import {MOVIES_FEATURE_STATE_NAME} from './store/state';
import {moviesFeatureReducer} from './store/reducer';
import {MoviesTableComponent} from './components/table/movies-table.component';
import {MoviesModalComponent} from './components/modal/movies-modal.component';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    AgGridModule.withComponents([]),
    StoreModule.forFeature(MOVIES_FEATURE_STATE_NAME, moviesFeatureReducer)
  ],
  declarations: [MoviesTableComponent, MoviesModalComponent]
})
export class MoviesModule {
}
