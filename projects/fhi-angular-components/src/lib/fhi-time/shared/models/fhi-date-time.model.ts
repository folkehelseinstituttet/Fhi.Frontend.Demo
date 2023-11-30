import { FhiDate } from './fhi-date.model';

interface FhiTime {
  hour: number;
  minute: number;
  second: number;
}

export interface FhiDateTime {
  date: FhiDate;
  time: FhiTime;
}
