import { LibraryItem, LibraryItemGroup } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemGroupsSharedData as GROUPS } from '../library-item-groups-shared-data';

import { TimeSelectorsIntro } from './_time-selectors.intro';

import { TimeSelectorDatepicker } from './time-selector-datepicker';
import { TimeSelectorDateAndTime } from './time-selector-date-and-time';
import { TimeSelectorDateRange } from './time-selector-date-range';
import { TimeSelectorWeek } from './time-selector-week';
import { TimeSelectorWeekRange } from './time-selector-week-range';
import { TimeSelectorYear } from './time-selector-year';

const TimeSelectors: LibraryItem[] = [
  ...TimeSelectorDatepicker,
  ...TimeSelectorDateAndTime,
  ...TimeSelectorWeek,
  ...TimeSelectorWeekRange,
  ...TimeSelectorYear,
  ...TimeSelectorDateRange,
];

export const TimeSelectorsData: LibraryItemGroup = {
  id: GROUPS.TimeSelectors.id,
  title: GROUPS.TimeSelectors.title,
  intro: TimeSelectorsIntro,
  libraryItems: TimeSelectors
};
