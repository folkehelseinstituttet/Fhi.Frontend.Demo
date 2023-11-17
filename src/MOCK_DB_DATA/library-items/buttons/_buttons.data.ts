import { LibraryItem, LibraryItemGroup } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemGroupsSharedData as GROUPS } from '../library-item-groups-shared-data';

import { ButtonsIntro } from './_buttons.intro';

import { ButtonGroup } from './button-group';
import { ButtonPrimary } from './button-primary';
import { ButtonSecondary } from './button-secondary';
import { ButtonLink } from './button-link';
import { ButtonIcon } from './button-icon';

const Buttons: LibraryItem[] = [
  ...ButtonPrimary,
  ...ButtonSecondary,
  ...ButtonLink,
  ...ButtonIcon,
  ...ButtonGroup,
];

export const ButtonsData: LibraryItemGroup = {
  id: GROUPS.Buttons.id,
  title: GROUPS.Buttons.title,
  intro: ButtonsIntro,
  libraryItems: Buttons,
};
