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
    this.i18n = this.getI18nValues();
  }

  getI18nValues(): LocalValues {
    return this.allLocals[this.locale];
  }

  getLocalDateString(date: Date): string {
    const localFormat = this.i18n.dateFormat;
    return format(date, localFormat);
  }
}
