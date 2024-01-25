import { LibraryItem, LibraryItemGroup } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemGroupsSharedData as GROUPS } from '../library-item-groups-shared-data';

import { TablesIntro } from './_tables.intro';

import { Table } from './table';
import { TableCompact } from './table-compact';
import { TableEditable } from './table-editable';
import { TableRowspan } from './table-rowspan';
import { TableSelectableRow } from './table-selectable-row';
import { TableSortable } from './table-sortable';
import { TableStriped } from './table-striped';

export const Tables: LibraryItem[] = [
  ...Table,
  ...TableCompact,
  ...TableStriped,
  ...TableSortable,
  ...TableSelectableRow,
  ...TableEditable,
  ...TableRowspan,
];

export const TablesData: LibraryItemGroup = {
  id: GROUPS.Tables.id,
  title: GROUPS.Tables.title,
  intro: TablesIntro,
  libraryItems: Tables,
};
