import { LibraryItem, LibraryItemGroup } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemGroupsSharedData as GROUPS } from '../library-item-groups-shared-data';

import { GlobalHeadersIntro } from './_global-headers.intro';

import { GlobalHeader } from './global-header';
import { GlobalHeaderWithMenu } from './global-header-with-menu';
import { GlobalHeaderWithMenuAndUtils } from './global-header-with-menu-and-utils';

export const GlobalHeaders: LibraryItem[] = [
  ...GlobalHeader,
  ...GlobalHeaderWithMenu,
  ...GlobalHeaderWithMenuAndUtils,
];

export const GlobalHeadersData: LibraryItemGroup = {
  id: GROUPS.GlobalHeaders.id,
  title: GROUPS.GlobalHeaders.title,
  intro: GlobalHeadersIntro,
  libraryItems: GlobalHeaders,
};
