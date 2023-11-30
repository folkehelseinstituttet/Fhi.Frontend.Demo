import { LibraryItem, LibraryItemGroup } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemGroupsSharedData as GROUPS } from '../library-item-groups-shared-data';

import { TimeSelectorsIntro } from './_time-selectors.intro';

import { TimeSelectorDatepicker } from './time-selector-datepicker';
import { TimeSelectorDateRange } from './time-selector-date-range';
import { TimeSelectorDateTime } from './time-selector-date-time';
import { TimeSelectorWeekpicker } from './time-selector-weekpicker';
import { TimeSelectorWeekRange } from './time-selector-week-range';
import { TimeSelectorYearMonth } from './time-selector-year-month';
import { TimeSelectorYearMonthRange } from './time-selector-year-month-range';
import { TimeSelectorYears } from './time-selector-years';
import { TimeSelectorYearRange } from './time-selector-year-range';

const TimeSelectors: LibraryItem[] = [
  ...TimeSelectorDatepicker,
  // ...TimeSelectorDateRange,
  ...TimeSelectorDateTime,
  ...TimeSelectorWeekpicker,
  // ...TimeSelectorWeekRange,
  ...TimeSelectorYearMonth,
  ...TimeSelectorYearMonthRange,
  ...TimeSelectorYears,
  ...TimeSelectorYearRange,
];

export const TimeSelectorsData: LibraryItemGroup = {
  id: GROUPS.TimeSelectors.id,
  title: GROUPS.TimeSelectors.title,
  titleLang: GROUPS.TimeSelectors.titleLang,
  intro: TimeSelectorsIntro,
  libraryItems: TimeSelectors,
};
