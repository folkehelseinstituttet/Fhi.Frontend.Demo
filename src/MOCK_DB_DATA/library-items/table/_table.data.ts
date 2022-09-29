import { LibraryItem } from 'src/app/views/shared/models/library-item.model';

import { Table } from './table';
import { TableSortable } from './table-sortable';
import { TableSelectableRow } from './table-selectable-row';

export const TableData: LibraryItem[] = [
  ...Table,
  ...TableSortable,
  ...TableSelectableRow
];
