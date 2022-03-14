import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AppComponent} from './app.component';
import {RootStoreModule} from '@shared/store/root-store.module';
import {TranslateModule} from '@ngx-translate/core';
import {TranslationConfig} from '@shared/translate/translate-utils';
import {AppRoutingModule} from './app-routing.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RootStoreModule,
    AppRoutingModule,
    TranslateModule.forRoot(TranslationConfig),
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
