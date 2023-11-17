import { LibraryItem, LibraryItemGroup } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemGroupsSharedData as GROUPS } from '../library-item-groups-shared-data';

import { HighchartsIntro } from './_highcharts.intro';

import { HighchartsWithoutMenu } from './highcharts-without-menu';
import { HighchartsWithMenuAndFooter } from './highcharts-with-menu-and-footer';
import { HighchartsWithMenu } from './highcharts-with-menu';

const Highcharts: LibraryItem[] = [
  ...HighchartsWithoutMenu,
  ...HighchartsWithMenu,
  ...HighchartsWithMenuAndFooter,
];

export const HighchartsData: LibraryItemGroup = {
  id: GROUPS.Highcharts.id,
  title: GROUPS.Highcharts.title,
  titleLang: GROUPS.Highcharts.titleLang,
  intro: HighchartsIntro,
  libraryItems: Highcharts,
};
