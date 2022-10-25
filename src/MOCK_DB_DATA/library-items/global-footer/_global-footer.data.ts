import { LibraryItem } from 'src/app/views/shared/models/library-item.model';

import { GlobalFooterPlain } from './global-footer-plain';
import { GlobalFooterOval } from './global-footer-red-oval';

export const GlobalFooterData: LibraryItem[] = [
  ...GlobalFooterPlain,
  ...GlobalFooterOval
];
