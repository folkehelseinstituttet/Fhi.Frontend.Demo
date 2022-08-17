import { LibraryItem } from 'src/app/views/shared/library/models/library-item.model';

import { FhiColors } from './colors-fonts/fhi-colors';
import { FhiColorsBootstrap } from './colors-fonts/fhi-colors-bootstrap';
import { FhiHeadings } from './colors-fonts/fhi-headings';
import { FhiTypographicHierarchy } from './colors-fonts/fhi-typographic-hierarchy';
import { FhiFontColors } from './colors-fonts/fhi-font-colors';

export const CssColorsFontsData: LibraryItem[] = [
  ...FhiColors,
  ...FhiColorsBootstrap,
  ...FhiHeadings,
  ...FhiTypographicHierarchy,
  ...FhiFontColors
];
