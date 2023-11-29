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
    this.i18n = this.allLocals[this.locale];
  }

  getI18nValues(): LocalValues {
    return this.i18n;
  }

  getLocalDateString(date: Date): string {
    const localFormat = this.i18n.dateFormat;
    return format(date, localFormat);
  }
}
