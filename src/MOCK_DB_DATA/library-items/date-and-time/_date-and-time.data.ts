import { LibraryItem } from 'src/app/views/shared/models/library-item.model';

import { DateRange } from './date-range';
import { YearSelection } from './year-selection';
import { WeekSelection } from './week-selection';

export const DateAndTimeData: LibraryItem[] = [
  ...DateRange,
  ...YearSelection,
  ...WeekSelection
];
