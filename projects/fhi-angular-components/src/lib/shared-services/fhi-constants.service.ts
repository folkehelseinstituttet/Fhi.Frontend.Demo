import { Injectable } from '@angular/core';
import { getYear } from 'date-fns';

@Injectable()
export class FhiConstantsService {

  MAX_YEAR: number = getYear(new Date());
  MIN_YEAR: number = 1900;
  
}
