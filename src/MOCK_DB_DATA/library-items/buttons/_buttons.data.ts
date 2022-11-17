import { LibraryItem } from 'src/app/views/shared/models/library-item.model';

import { BtnPrimary } from './btn-primary';
import { BtnSecondary } from './btn-secondary';
import { BtnFlat } from './btn-flat';
import { BtnFlatSecondary } from './btn-flat-secondary';
import { BtnIcon } from './btn-icon';
import { BtnShortcut } from './btn-shortcut';
import { BtnShortcutLink } from './btn-shortcut-link';
import { BtnMenuItem } from './btn-menu-item';

export const ButtonsData: LibraryItem[] = [
  ...BtnPrimary,
  ...BtnSecondary,
  ...BtnFlat,
  ...BtnFlatSecondary,
  ...BtnIcon,
  ...BtnShortcut,
  ...BtnShortcutLink,
  ...BtnMenuItem
];
