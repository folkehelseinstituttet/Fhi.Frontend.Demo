import { LibraryItem, LibraryItemGroup } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemGroupsSharedData as GROUPS } from '../library-item-groups-shared-data';

import { PrototypeTablesIntro } from './_prototype-tables.intro';

import { PrototypeTableWithExpandableContent } from './prototype-table-with-expandable-content';

export const PrototypeTables: LibraryItem[] = [...PrototypeTableWithExpandableContent];

export const PrototypeTablesData: LibraryItemGroup = {
  id: GROUPS.PrototypeTables.id,
  title: GROUPS.PrototypeTables.title,
  intro: PrototypeTablesIntro,
  libraryItems: PrototypeTables,
};
