import { LibraryItem } from 'src/app/views/shared/models/library-item.model';

import { Tabs } from './tabs';
import { TabsAlternative } from './tabs-alternative';

export const TabsData: LibraryItem[] = [
  ...Tabs,
  ...TabsAlternative
];
