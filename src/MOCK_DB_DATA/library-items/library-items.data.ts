import { LibraryItem } from 'src/app/views/shared/models/library-item.model';

import { PrototypeAngularTreeData } from './prototype-angular-tree/_prototype-angular-tree.data';
import { PrototypeTableWithExpandableContentData } from './prototype-table-with-expandable-content/_prototype-table-with-expandable-content.data';

export const AllData: LibraryItem[] = [
  ...PrototypeAngularTreeData,
  ...PrototypeTableWithExpandableContentData,
];
