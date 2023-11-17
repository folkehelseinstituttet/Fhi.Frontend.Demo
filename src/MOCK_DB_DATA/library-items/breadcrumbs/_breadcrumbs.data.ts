import { LibraryItem, LibraryItemGroup } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemGroupsSharedData as GROUPS } from '../library-item-groups-shared-data';

import { BreadcrumbsIntro } from './_breadcrumbs.intro';

import { Breadcrumb } from './breadcrumb';

const Breadcrumbs: LibraryItem[] = [...Breadcrumb];

export const BreadcrumbsData: LibraryItemGroup = {
  id: GROUPS.Breadcrumbs.id,
  title: GROUPS.Breadcrumbs.title,
  intro: BreadcrumbsIntro,
  libraryItems: Breadcrumbs,
};
