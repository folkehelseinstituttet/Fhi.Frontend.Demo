import { LibraryItem, LibraryItems } from 'src/app/views/shared/models/library-item.model';

import { HighchartsSectionIntro } from './_highcharts.intro';

import { Highcharts } from './highcharts';
import { HighchartsWithMenuAndFooter } from './highcharts-with-menu-and-footer';
import { HighchartsWithMenu } from './highcharts-with-menu';

export const HighchartsData: LibraryItem[] = [
  ...Highcharts,
  ...HighchartsWithMenu,
  ...HighchartsWithMenuAndFooter
];

export const HighchartsDataNew: LibraryItems = {
  id: '',
  title: '',
  intro: HighchartsSectionIntro,
  libraryItems: HighchartsData
}
