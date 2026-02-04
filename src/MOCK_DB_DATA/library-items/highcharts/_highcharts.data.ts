import { LibraryItem, LibraryItemGroup } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemGroupsSharedData as GROUPS } from '../library-item-groups-shared-data';

import { HighchartsIntro } from './_highcharts.intro';

import { HighchartsWithoutMenu } from './highcharts-without-menu';
import { HighchartsAllInclusive } from './highcharts-all-inclusive';
import { HighchartsWithMenu } from './highcharts-with-menu';
import { HighchartsMapWithSlot } from './highcharts-map-with-slot';

const Highcharts: LibraryItem[] = [
  ...HighchartsWithoutMenu,
  ...HighchartsWithMenu,
  ...HighchartsAllInclusive,
  ...HighchartsMapWithSlot,
];

export const HighchartsData: LibraryItemGroup = {
  id: GROUPS.Highcharts.id,
  title: GROUPS.Highcharts.title,
  titleLang: GROUPS.Highcharts.titleLang,
  intro: HighchartsIntro,
  libraryItems: Highcharts,
};
