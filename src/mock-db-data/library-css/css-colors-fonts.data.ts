import { LibraryExample } from 'src/app/shared/models/library-example.model';

import { FhiColors } from './colors-fonts/fhi-colors';
import { FhiColorsBootstrap } from './colors-fonts/fhi-colors-bootstrap';
import { FhiHeadings } from './colors-fonts/fhi-headings';
import { FhiTypographicHierarchy } from './colors-fonts/fhi-typographic-hierarchy';
import { FhiFontColors } from './colors-fonts/fhi-font-colors';

export const CssFargerSkriftData: LibraryExample[] = [
  ...FhiColors,
  ...FhiColorsBootstrap,
  ...FhiHeadings,
  ...FhiTypographicHierarchy,
  ...FhiFontColors
];
