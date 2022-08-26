import { LibraryItem } from 'src/app/views/shared/library/models/library-item.model';

import { Table } from './table';
import { TableSelectableRow } from './table-selectable-row';
import { TableSortable } from './table-sortable';

export const TableData: LibraryItem[] = [
  ...Table,
  ...TableSelectableRow,
  ...TableSortable
];


