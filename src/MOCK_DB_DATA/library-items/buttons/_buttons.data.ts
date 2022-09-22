import { LibraryItem } from 'src/app/views/shared/library/models/library-item.model';

import { BtnPrimary } from './btn-primary';
import { BtnSecondary } from './btn-secondary';
import { BtnFlat } from './btn-flat';
import { BtnIcon } from './btn-icon';
import { ButtonShortcut } from './btn-shortcut';
import { ButtonShortcutLink } from './btn-shortcut-link';

export const ButtonsData: LibraryItem[] = [
  ...BtnPrimary,
  ...BtnSecondary,
  ...BtnFlat,
  ...BtnIcon,
  ...ButtonShortcut,
  ...ButtonShortcutLink
];


