import { LibraryItem, LibraryItemGroup } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemGroupsSharedData } from '../library-item-groups-shared-data';

import { TemplateSectionIntro } from './_template.intro';

import { Template1 } from './template1';
import { Template2 } from './template2';

export const TemplateItems: LibraryItem[] = [
  ...Template1,
  ...Template2
];

export const TemplateGroupData: LibraryItemGroup = {
  id: LibraryItemGroupsSharedData.Templates.id,
  title: LibraryItemGroupsSharedData.Templates.title,
  intro: TemplateSectionIntro,
  libraryItems: TemplateItems
};
