import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {AuthorTableComponent} from './components/table/author-table.component';

const routes: Routes = [
  {
    path: '',
    component: AuthorTableComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthorRoutingModule {
}
