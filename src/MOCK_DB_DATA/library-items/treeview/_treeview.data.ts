import { LibraryItem } from 'src/app/views/shared/models/library-item.model';

import { AngularTreeComponent } from './angular-tree-component';
import { TreeViewCheckbox } from './treeview-checkbox';

export const TreeviewData: LibraryItem[] = [
  ...TreeViewCheckbox
];

export const AngularTreeComponentData: LibraryItem[] = [
  ...AngularTreeComponent
]
