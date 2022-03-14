import { HttpClient } from '@angular/common/http';
import { isDevMode } from '@angular/core';
import {
  MissingTranslationHandler,
  MissingTranslationHandlerParams,
  TranslateCompiler,
  TranslateLoader,
} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateMessageFormatCompiler } from 'ngx-translate-messageformat-compiler';

export function TranslateHttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '-sasnext.json');
}

export function TranslateMessageFormaCompilerFactory() {
  return new TranslateMessageFormatCompiler();
}

export class AppMissingTranslationHandler implements MissingTranslationHandler {
  handle(params: MissingTranslationHandlerParams): any {
    const message = `Missing Translation: ${params.key}`;
    if (isDevMode()) {
      return message;
    }
    return params.key;
  }
}

export const TranslationConfig = {
  loader: {
    provide: TranslateLoader,
    useFactory: TranslateHttpLoaderFactory,
    deps: [HttpClient],
  },
  missingTranslationHandler: {
    provide: MissingTranslationHandler,
    useClass: AppMissingTranslationHandler,
  },
  compiler: {
    provide: TranslateCompiler,
    useFactory: TranslateMessageFormaCompilerFactory,
  },
  isolate: false,
};
