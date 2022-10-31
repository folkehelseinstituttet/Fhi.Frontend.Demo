import { LibraryItem } from 'src/app/views/shared/models/library-item.model';

import { GlobalFooter } from './global-footer';
import { GlobalFooterArch } from './global-footer-arch';

export const GlobalFooterData: LibraryItem[] = [
  ...GlobalFooter,
  ...GlobalFooterArch
];
