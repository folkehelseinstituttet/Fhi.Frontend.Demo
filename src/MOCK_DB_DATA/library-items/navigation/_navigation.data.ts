import { LibraryItem } from 'src/app/views/shared/library/models/library-item.model';

import { NavShortcut } from './shortcut-link';
import { NavShortcutBack } from './shortcut-link-back';
import { NavShortcutBtn } from './shortcut-link-btn';

export const NavigationData: LibraryItem[] = [
  ...NavShortcut,
  ...NavShortcutBack,
  ...NavShortcutBtn
];


