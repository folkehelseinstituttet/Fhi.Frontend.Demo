import { LibraryItem, LibraryItemGroup } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemGroupsSharedData as GROUPS } from '../library-item-groups-shared-data';

import { LayoutTemplatesIntro } from './_layout-templates.intro';

import { LayoutTemplateFullwidth } from '../layout-templates/layout-template-fullwidth';
import { LayoutTemplateTwoCols } from './layout-template-two-cols';
import { LayoutTemplateExpandableFirstCol } from './layout-template-expandable-first-col';

export const LayoutTemplates: LibraryItem[] = [
  ...LayoutTemplateFullwidth,
  ...LayoutTemplateTwoCols,
  ...LayoutTemplateExpandableFirstCol,
];

export const LayoutTemplatesData: LibraryItemGroup = {
  id: GROUPS.LayoutTemplates.id,
  title: GROUPS.LayoutTemplates.title,
  intro: LayoutTemplatesIntro,
  libraryItems: LayoutTemplates,
};
