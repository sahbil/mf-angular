import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {MoviesTableComponent} from './components/table/movies-table.component';

const routes: Routes = [
  {
    path: '',
    component: MoviesTableComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoviesRoutingModule {
}
