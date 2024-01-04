import { LibraryItem, LibraryItemGroup } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemGroupsSharedData as GROUPS } from '../library-item-groups-shared-data';

import { GlobalFootersIntro } from './_global-footers.intro';

import { GlobalFooter } from './global-footer';
import { GlobalFooterArch } from './global-footer-arch';

export const GlobalFooters: LibraryItem[] = [...GlobalFooter, ...GlobalFooterArch];

export const GlobalFootersData: LibraryItemGroup = {
  id: GROUPS.GlobalFooters.id,
  title: GROUPS.GlobalFooters.title,
  intro: GlobalFootersIntro,
  libraryItems: GlobalFooters,
};
