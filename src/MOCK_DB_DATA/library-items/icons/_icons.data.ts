import { LibraryItem, LibraryItemGroup } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemGroupsSharedData as GROUPS } from '../library-item-groups-shared-data';
import { LibraryItemConstants as CONST } from '../library-item-constants';

import { IconsIntro } from './_icons.intro';

import { IconSet } from './icon-set';
import { IconSizes } from './icon-sizes';

const Icons: LibraryItem[] = [...IconSizes, ...IconSet];

export const IconsData: LibraryItemGroup = {
  id: GROUPS.Icons.id,
  title: GROUPS.Icons.title,
  titleLang: CONST.languageLocaleId_NO,
  intro: IconsIntro,
  libraryItems: Icons,
};
