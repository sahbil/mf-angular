import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {LoggerModule, NgxLoggerLevel} from 'ngx-logger';
import {TranslateModule} from '@ngx-translate/core';
import {TranslationConfig} from './translate/translate-utils';
import {DynamicModalDirective} from '@shared/directive/dynamic-modal.directive';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    LoggerModule.forRoot({
      level: NgxLoggerLevel.DEBUG,
    }),
    TranslateModule.forChild(TranslationConfig),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [DynamicModalDirective],
  exports: [
    DynamicModalDirective,
    HttpClientModule
  ]
})
export class SharedModule {

}
