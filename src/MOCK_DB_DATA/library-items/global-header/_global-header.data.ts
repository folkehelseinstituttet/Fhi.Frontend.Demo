import { LibraryItem } from 'src/app/views/shared/models/library-item.model';

import { GlobalHeader } from './global-header';
import { GlobalHeaderWithMenu } from './global-header-with-menu';

export const GlobalHeaderData: LibraryItem[] = [
  ...GlobalHeader,
  ...GlobalHeaderWithMenu
];
