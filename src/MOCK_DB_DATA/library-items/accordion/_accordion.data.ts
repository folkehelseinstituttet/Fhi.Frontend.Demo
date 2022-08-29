import { LibraryItem } from 'src/app/views/shared/library/models/library-item.model';

import { Accordion } from './accordion';
import { AccordionFlush } from './accordion-flush';
import { FhiAccordionFlush } from './fhi-accordion-flush';

export const AccordionData: LibraryItem[] = [
  ...Accordion,
  ...AccordionFlush,
  ...FhiAccordionFlush
];


