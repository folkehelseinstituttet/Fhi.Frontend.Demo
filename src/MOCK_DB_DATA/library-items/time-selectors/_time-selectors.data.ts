import { LibraryItem, LibraryItemGroup } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemGroupsSharedData as GROUPS } from '../library-item-groups-shared-data';

import { TimeSelectorsIntro } from './_time-selectors.intro';

import { TimeSelectorDatepicker } from './datepicker';
import { TimeSelectorDateRange } from './date-range';
import { TimeSelectorWeek } from './week-selector';
import { TimeSelectorYear } from './year-selector';

const TimeSelectors: LibraryItem[] = [
  ...TimeSelectorDatepicker,
  ...TimeSelectorDateRange,
  ...TimeSelectorWeek,
  ...TimeSelectorYear,
];

export const TimeSelectorsData: LibraryItemGroup = {
  id: GROUPS.TimeSelectors.id,
  title: GROUPS.TimeSelectors.title,
  intro: TimeSelectorsIntro,
  libraryItems: TimeSelectors
};
