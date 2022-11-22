import { LibraryItem } from 'src/app/views/shared/models/library-item.model';

import { DateSelection } from './date-selection';
import { WeekSelection } from './week-selection';

export const DateAndTimeSelectionData: LibraryItem[] = [
  ...DateSelection,
  ...WeekSelection
];
