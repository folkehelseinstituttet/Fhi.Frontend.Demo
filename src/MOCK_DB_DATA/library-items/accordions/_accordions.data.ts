import { LibraryItem, LibraryItemGroup } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemGroupsSharedData as GROUPS } from '../library-item-groups-shared-data';

import { AccordionsIntro } from './_accordions.intro';

import { Accordion } from './accordion';
import { AccordionFlush } from './accordion-flush';
import { AccordionFlushDark } from './accordion-flush-dark';

const AccordionItems: LibraryItem[] = [
  ...Accordion,
  ...AccordionFlush,
  ...AccordionFlushDark
];

export const AccordionsData: LibraryItemGroup = {
  id: GROUPS.Accordions.id,
  title: GROUPS.Accordions.title,
  intro: AccordionsIntro,
  libraryItems: AccordionItems
};
