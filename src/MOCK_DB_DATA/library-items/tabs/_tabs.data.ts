import { LibraryItem } from 'src/app/views/shared/models/library-item.model';

import { Tabs } from './tabs';
import { TabsBottomBordered } from './tabs-bottom-bordered';
import { TabsOnBlueBackground } from './tabs-on-blue-background';
import { TabsBlueAndBlueBackground } from './blue-tabs-and-background';

export const TabsData: LibraryItem[] = [
  ...Tabs,
  ...TabsBottomBordered,
  ...TabsBlueAndBlueBackground
];

export const TabsPageTemplateData: LibraryItem[] = [
  ...TabsOnBlueBackground
];
