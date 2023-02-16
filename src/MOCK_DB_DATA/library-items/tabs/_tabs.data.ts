import { LibraryItem } from 'src/app/views/shared/models/library-item.model';

import { Tabs } from './tabs';
import { TabsBlue } from './tabs-blue';

export const TabsData: LibraryItem[] = [
  ...Tabs,
  ...TabsBlue
];
