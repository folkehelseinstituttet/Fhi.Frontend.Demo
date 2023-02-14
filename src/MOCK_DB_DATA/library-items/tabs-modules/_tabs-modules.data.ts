import { LibraryItem } from 'src/app/views/shared/models/library-item.model';

import { TabsBottomBordered } from './tabs-bottom-bordered';
import { TabsWithGreyBackground } from './tabs-grey-background';

export const TabsModulesData: LibraryItem[] = [
  ...TabsBottomBordered,
  ...TabsWithGreyBackground
];
