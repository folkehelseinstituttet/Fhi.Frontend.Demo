import { LibraryExample } from 'src/app/shared/models/library-example.model';

import { FhiColors } from './farger-skrift/fhi-colors';
import { FhiColorsBootstrap } from './farger-skrift/fhi-colors-bootstrap';
import { FhiHeadings } from './farger-skrift/fhi-headings';
import { FhiTypographicHierarchy } from './farger-skrift/fhi-typographic-hierarchy';
import { FhiFontColors } from './farger-skrift/fhi-font-colors';

export const CssFargerSkriftData: LibraryExample[] = [
  ...FhiColors,
  ...FhiColorsBootstrap,
  ...FhiHeadings,
  ...FhiTypographicHierarchy,
  ...FhiFontColors
];
