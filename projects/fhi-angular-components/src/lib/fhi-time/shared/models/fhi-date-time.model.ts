import { FhiDate } from './fhi-date.model';
import { FhiTime } from '../../fhi-date-time/time.model';

export interface FhiDateTime {
  date: FhiDate;
  time: FhiTime;
}
