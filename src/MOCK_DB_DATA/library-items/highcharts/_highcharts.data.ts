import { LibraryItem } from 'src/app/views/shared/models/library-item.model';

import { Highcharts } from './highcharts';
import { HighchartsWithMenuAndFooter } from './highcharts-with-menu-and-footer';
import { HighchartsWithMenu } from './highcharts-with-menu';

export const HighchartsData: LibraryItem[] = [
  ...Highcharts,
  ...HighchartsWithMenu,
  ...HighchartsWithMenuAndFooter
];
