import {NgModule} from '@angular/core';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {HttpClientModule} from '@angular/common/http';
import {TranslationConfig} from './translate-utils';
import {DEFAULT_LANGUAGE} from './constant';

@NgModule({
  imports: [HttpClientModule, TranslateModule.forChild(TranslationConfig)],
  exports: [TranslateModule],
})
export class LazyTranslationModule {
  constructor(private readonly translate: TranslateService) {
    this.translate.setDefaultLang(DEFAULT_LANGUAGE);
    this.translate.use(DEFAULT_LANGUAGE);
  }
}
