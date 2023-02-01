import { LibraryItem } from 'src/app/views/shared/models/library-item.model';

import { Table } from './table';
import { TableCompact } from './table-compact';
import { TableEditable } from './table-editable';
import { TableSelectableRow } from './table-selectable-row';
import { TableSortable } from './table-sortable';
import { TableStriped } from './table-striped';

export const TableData: LibraryItem[] = [
  ...Table,
  ...TableCompact,
  ...TableStriped,
  ...TableSortable,
  ...TableSelectableRow,
  ...TableEditable
];
