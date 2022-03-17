import {NgModule} from '@angular/core';
import {SharedModule} from '@shared/shared.module';
import {AgGridModule} from 'ag-grid-angular';
import {StoreModule} from '@ngrx/store';
import {AUTHOR_FEATURE_STATE_NAME} from './store/state';
import {moviesFeatureReducer} from './store/reducer';
import {AuthorTableComponent} from './components/table/author-table.component';
import {CommonModule} from '@angular/common';
import {AuthorRoutingModule} from './author-routing.module';

@NgModule({
  imports: [
    SharedModule,
    AuthorRoutingModule,
    CommonModule,
    AgGridModule.withComponents([]),
    StoreModule.forFeature(AUTHOR_FEATURE_STATE_NAME, moviesFeatureReducer)
  ],
  declarations: [AuthorTableComponent]
})
export class AuthorModule {
}
