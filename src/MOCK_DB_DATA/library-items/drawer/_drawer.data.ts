import { LibraryItem } from 'src/app/views/shared/models/library-item.model';

import { Drawer } from './drawer';
import { DrawerOverlayed } from './drawer-overlayed';

export const DrawerData: LibraryItem[] = [
  ...Drawer,
  ...DrawerOverlayed
];
