import { LibraryItem, LibraryItemGroup } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemGroupsSharedData as GROUPS } from '../library-item-groups-shared-data';

import { BadgesIntro } from './_badges.intro';

import { BadgeCircular } from './badge-circular';
import { BadgeRounded } from './badge-rounded';

const Badges: LibraryItem[] = [...BadgeCircular, ...BadgeRounded];

export const BadgesData: LibraryItemGroup = {
  id: GROUPS.Badges.id,
  title: GROUPS.Badges.title,
  titleLang: GROUPS.Badges.titleLang,
  intro: BadgesIntro,
  libraryItems: Badges,
};
