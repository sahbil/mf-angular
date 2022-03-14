import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {LoggerModule, NgxLoggerLevel} from 'ngx-logger';
import {TranslateModule} from '@ngx-translate/core';
import {TranslationConfig} from './translate/translate-utils';
import {DynamicModalDirective} from '@shared/directive/dynamic-modal.directive';

@NgModule({
  imports: [
    CommonModule,
    LoggerModule.forRoot({
      level: NgxLoggerLevel.DEBUG,
    }),
    TranslateModule.forChild(TranslationConfig),
  ],
  declarations: [DynamicModalDirective],
  exports: [DynamicModalDirective]
})
export class SharedModule {

}
