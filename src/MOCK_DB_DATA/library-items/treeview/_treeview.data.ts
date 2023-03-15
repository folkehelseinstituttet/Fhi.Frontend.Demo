import { LibraryItem } from 'src/app/views/shared/models/library-item.model';

import { TreeViewNavigation } from './treeview-navigation';
import { TreeViewCheckbox } from './treeview-checkbox';

export const TreeViewData: LibraryItem[] = [
  ...TreeViewNavigation,
  ...TreeViewCheckbox
];
