import { LibraryItem } from 'src/app/views/shared/models/library-item.model';

import { GlobalFooterPlain } from './global-footer-plain';
import { GlobalFooterArch } from './global-footer-red-arch';

export const GlobalFooterData: LibraryItem[] = [
  ...GlobalFooterPlain,
  ...GlobalFooterArch
];
