import { LibraryItem } from 'src/app/views/shared/library/models/library-item.model';

import { ColorSystem } from './color-system';
import { ColorsBootstrap } from './colors-bootstrap';
import { FontColors } from './font-colors';

export const ColorData: LibraryItem[] = [
  ...ColorSystem,
  ...ColorsBootstrap,
  ...FontColors
];


