import { LibraryItem } from 'src/app/views/shared/models/library-item.model';

import { IconColors } from './icon-colors';
import { IconSet } from './icon-set';
import { IconSizes } from './icon-sizes';

export const IconsData: LibraryItem[] = [
  ...IconSizes,
  ...IconColors,
  ...IconSet
];
