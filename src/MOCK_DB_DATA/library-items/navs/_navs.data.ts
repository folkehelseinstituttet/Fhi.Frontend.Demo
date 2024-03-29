import { LibraryItem, LibraryItemGroup } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemGroupsSharedData as GROUPS } from '../library-item-groups-shared-data';

import { NavsIntro } from './_navs.intro';

import { NavTabs } from './nav-tabs';
import { NavTiles } from './nav-tiles';
import { NavButtons } from './nav-buttons';
import { NavPopoverMenu } from './nav-popover-menu';
import { NavShortcuts } from './nav-shortcuts';
import { NavShortcutButtons } from './nav-shortcut-buttons';

const Navs: LibraryItem[] = [
  ...NavTabs,
  ...NavTiles,
  ...NavButtons,
  ...NavPopoverMenu,
  ...NavShortcuts,
  ...NavShortcutButtons,
];

export const NavsData: LibraryItemGroup = {
  id: GROUPS.Navs.id,
  title: GROUPS.Navs.title,
  titleLang: GROUPS.Navs.titleLang,
  intro: NavsIntro,
  libraryItems: Navs,
};
