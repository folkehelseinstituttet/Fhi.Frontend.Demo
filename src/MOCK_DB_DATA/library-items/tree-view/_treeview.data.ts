import { LibraryItem } from 'src/app/views/shared/models/library-item.model';

import { TreeView } from './treeview';
import { TreeViewNavigation } from './treeview-navigation';
import { TreeViewBuilder } from './treeview-builder';
import { TreeViewCheckbox } from './treeview-checkbox';

export const TreeViewData: LibraryItem[] = [
  // ...TreeView,
  ...TreeViewNavigation,
  // ...TreeViewCheckbox,
  ...TreeViewBuilder
];
