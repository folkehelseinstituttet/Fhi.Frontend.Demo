import { LibraryItem, LibraryItemGroup } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemGroupsSharedData as GROUPS } from '../library-item-groups-shared-data';
import { LibraryItemConstants as CONST } from '../library-item-constants';

import { TypographyIntro } from './_typography.intro';

import { HeadingLevels } from './heading-levels';
import { TypographicHierarchy } from './typographic-hierarchy';

const Typography: LibraryItem[] = [...HeadingLevels, ...TypographicHierarchy];

export const TypographyData: LibraryItemGroup = {
  id: GROUPS.Typography.id,
  title: GROUPS.Typography.title,
  titleLang: CONST.languageLocaleId_NO,
  intro: TypographyIntro,
  libraryItems: Typography,
};
