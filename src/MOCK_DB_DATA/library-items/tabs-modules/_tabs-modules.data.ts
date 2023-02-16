import { LibraryItem } from 'src/app/views/shared/models/library-item.model';

import { TabsBottomBordered } from './tabs-bottom-bordered';
import { TabsOnBlueBackground } from './tabs-on-blue-background';
import { TabsBlueAndBlueBackground } from './blue-tabs-and-background';

export const TabsModulesData: LibraryItem[] = [
  ...TabsBottomBordered,
  ...TabsOnBlueBackground,
  ...TabsBlueAndBlueBackground
];
