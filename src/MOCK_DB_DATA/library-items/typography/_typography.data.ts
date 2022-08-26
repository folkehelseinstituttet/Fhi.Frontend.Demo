import { LibraryItem } from 'src/app/views/shared/library/models/library-item.model';

import { HeadingLevels } from './heading-levels';
import { TypographicHierarchy } from './typographic-hierarchy';

export const TypographyData: LibraryItem[] = [
  ...HeadingLevels,
  ...TypographicHierarchy
];


