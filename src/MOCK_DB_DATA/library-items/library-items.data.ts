import { LibraryItem } from 'src/app/views/shared/models/library-item.model';

import { PrototypeAngularTreeData } from './prototype-angular-tree/_prototype-angular-tree.data';
import { PrototypeFormsData } from './prototype-forms/_prototype-forms.data';
import { PrototypePageheaderData } from './prototype-pageheader/_prototype-pageheader.data';
import { PrototypeTableWithExpandableContentData } from './prototype-table-with-expandable-content/_prototype-table-with-expandable-content.data';
import { TreeViewData } from './tree-view/_tree-view.data';

export const AllData: LibraryItem[] = [
  ...PrototypeAngularTreeData,
  ...PrototypeFormsData,
  ...PrototypePageheaderData,
  ...PrototypeTableWithExpandableContentData,
  ...TreeViewData,
];
