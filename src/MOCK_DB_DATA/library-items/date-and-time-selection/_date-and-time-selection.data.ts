import { LibraryItem } from 'src/app/views/shared/models/library-item.model';

import { YearSelection } from './year-selection';
import { WeekSelection } from './week-selection';

export const DateAndTimeSelectionData: LibraryItem[] = [
  ...YearSelection,
  ...WeekSelection
];
