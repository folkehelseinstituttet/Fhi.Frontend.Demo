import { LibraryItem } from 'src/app/views/shared/models/library-item.model';

import { DrawerData } from './drawer/_drawer.data';
import { GlobalHeaderData } from './global-header/_global-header.data';
import { PrototypeAngularTreeData } from './prototype-angular-tree/_prototype-angular-tree.data';
import { PrototypeFormsData } from './prototype-forms/_prototype-forms.data';
import { PrototypePageheaderData } from './prototype-pageheader/_prototype-pageheader.data';
import { PrototypeTableWithExpandableContentData } from './prototype-table-with-expandable-content/_prototype-table-with-expandable-content.data';
import { TootipPopoverData } from './tooltip-popover/_tooltip-popover.data';
import { TreeViewData } from './tree-view/_tree-view.data';

export const AllData: LibraryItem[] = [
  ...DrawerData,
  ...GlobalHeaderData,
  ...PrototypeAngularTreeData,
  ...PrototypeFormsData,
  ...PrototypePageheaderData,
  ...PrototypeTableWithExpandableContentData,
  ...TootipPopoverData,
  ...TreeViewData,
];
