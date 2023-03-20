import { LibraryItem } from 'src/app/views/shared/models/library-item.model';

import { TreeViewNavigation } from './tree-view-navigation';
import { TreeViewCheckbox } from './tree-view-checkbox';

export const TreeViewData: LibraryItem[] = [
  ...TreeViewNavigation,
  ...TreeViewCheckbox
];
