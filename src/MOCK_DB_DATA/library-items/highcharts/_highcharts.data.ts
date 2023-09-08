import { LibraryItem, LibraryItemGroup } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemGroupsSharedData as GROUPS } from '../library-item-groups-shared-data';

import { HighchartsIntro } from './_highcharts.intro';

import { Highcharts } from './highcharts';
import { HighchartsWithMenuAndFooter } from './highcharts-with-menu-and-footer';
import { HighchartsWithMenu } from './highcharts-with-menu';

const HighchartsItems: LibraryItem[] = [
  ...Highcharts,
  ...HighchartsWithMenu,
  ...HighchartsWithMenuAndFooter
];

export const HighchartsData: LibraryItemGroup = {
  id: GROUPS.Highcharts.id,
  title: GROUPS.Highcharts.title,
  intro: HighchartsIntro,
  libraryItems: HighchartsItems
};
