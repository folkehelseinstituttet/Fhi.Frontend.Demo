import { Injectable } from '@angular/core';
import { LOCALE_ID, Inject } from '@angular/core';

import { LocalValues } from './local-values.model';
import { LocalValuesNb } from './local-values-nb';
import { format } from 'date-fns';

@Injectable()
export class I18nService {
  private i18n: LocalValues;
  private allLocals = {
    nb: LocalValuesNb,
  };

  constructor(
    @Inject(LOCALE_ID)
    private locale: string,
  ) {
    this.validateLocale(this.locale);
    this.i18n = this.allLocals[this.locale];
  }

  getI18nValues(): LocalValues {
    return this.i18n;
  }

  getLocalDateString(date: Date): string {
    return format(date, this.i18n.dateFormat);
  }

  private validateLocale(currentLocale: string) {
    const validLocale = Object.keys(this.allLocals).find((locale) => locale === currentLocale);
    if (validLocale === undefined) {
      throw new Error('The locale for this app is not supported by FHI Time components.');
    }
  }
}
