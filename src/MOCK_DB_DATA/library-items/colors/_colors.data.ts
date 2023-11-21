import { LibraryItem, LibraryItemGroup } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemGroupsSharedData as GROUPS } from '../library-item-groups-shared-data';
import { LibraryItemConstants as CONST } from '../library-item-constants';

import { ColorsIntro } from './_colors.intro';

import { ColorSystem } from './color-system';
import { ColorsBootstrap } from './colors-bootstrap';
import { FontColors } from './font-colors';

const Colors: LibraryItem[] = [...ColorSystem, ...ColorsBootstrap, ...FontColors];

export const IconsData: LibraryItemGroup = {
  id: GROUPS.Colors.id,
  title: GROUPS.Colors.title,
  titleLang: CONST.languageLocaleId_NO,
  intro: ColorsIntro,
  libraryItems: Colors,
};
