import { LibraryItem } from 'src/app/views/shared/models/library-item.model';

import { HeadingLevels } from './heading-levels';
import { TypographicHierarchy } from './typographic-hierarchy';

export const TypographyData: LibraryItem[] = [
  ...HeadingLevels,
  ...TypographicHierarchy
];
