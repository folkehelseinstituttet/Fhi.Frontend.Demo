import { LibraryItem, LibraryItemGroup } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemGroupsSharedData } from '../library-item-groups.shared-data';

import { HighchartsSectionIntro } from './_highcharts.intro';

import { Highcharts } from './highcharts';
import { HighchartsWithMenuAndFooter } from './highcharts-with-menu-and-footer';
import { HighchartsWithMenu } from './highcharts-with-menu';

export const HighchartsItems: LibraryItem[] = [
  ...Highcharts,
  ...HighchartsWithMenu,
  ...HighchartsWithMenuAndFooter
];

export const HighchartsGroupData: LibraryItemGroup = {
  id: LibraryItemGroupsSharedData.FhiAngularHighcharts.id,
  title: LibraryItemGroupsSharedData.FhiAngularHighcharts.title,
  intro: HighchartsSectionIntro,
  libraryItems: HighchartsItems
};
