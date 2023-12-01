import { Injectable } from '@angular/core';
import { LOCALE_ID, Inject } from '@angular/core';

import { LocaleValues } from './locale-values.model';
import { LocaleValuesNb } from './locale-values-nb';
import { format } from 'date-fns';

@Injectable()
export class I18nService {
  private i18n: LocaleValues;
  private allLocales = {
    nb: LocaleValuesNb,
  };

  constructor(
    @Inject(LOCALE_ID)
    private locale: string,
  ) {
    this.validateLocale(this.locale);
    this.i18n = this.allLocales[this.locale];
  }

  getI18nValues(): LocaleValues {
    return this.i18n;
  }

  getLocalDateString(date: Date): string {
    return format(date, this.i18n.dateFormat);
  }

  private validateLocale(currentLocale: string) {
    const validLocale = Object.keys(this.allLocales).find((locale) => locale === currentLocale);
    if (validLocale === undefined) {
      throw new Error(
        `The locale for this app (${currentLocale}) is not supported by the FHI Time components.`,
      );
    }
  }
}
