import { LibraryItem, LibraryItemGroup } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemGroupsSharedData as GROUPS } from '../library-item-groups-shared-data';

import { LayoutTemplatesIntro } from './_layout-templates.intro';

import { LayoutTemplateBasic } from './layout-template-basic';
import { LayoutTemplateExpandableFirstCol } from './layout-template-expandable-first-col';
import { LayoutTemplateTwoCols1 } from './layout-template-two-cols-1';

export const LayoutTemplates: LibraryItem[] = [
  ...LayoutTemplateBasic,
  ...LayoutTemplateTwoCols1,
  ...LayoutTemplateExpandableFirstCol,
];

export const LayoutTemplatesData: LibraryItemGroup = {
  id: GROUPS.LayoutTemplates.id,
  title: GROUPS.LayoutTemplates.title,
  intro: LayoutTemplatesIntro,
  libraryItems: LayoutTemplates,
};
