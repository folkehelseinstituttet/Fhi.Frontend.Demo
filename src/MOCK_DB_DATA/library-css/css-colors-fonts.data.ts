import { LibraryItem } from 'src/app/views/shared/library/models/library-item.model';

import { FhiHeadings } from './colors-fonts/fhi-headings';
import { FhiTypographicHierarchy } from './colors-fonts/fhi-typographic-hierarchy';

export const CssColorsFontsData: LibraryItem[] = [
  ...FhiHeadings,
  ...FhiTypographicHierarchy
];
