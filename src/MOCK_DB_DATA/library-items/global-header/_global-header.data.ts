import { LibraryItem } from 'src/app/views/shared/models/library-item.model';

import { GlobalHeader } from './global-header';
import { GlobalHeaderWithMenu } from './global-header-with-menu';
import { GlobalHeaderWithMenuAndUtils } from './global-header-with-menu-and-utils';

export const GlobalHeaderData: LibraryItem[] = [
  ...GlobalHeader,
  ...GlobalHeaderWithMenu,
  ...GlobalHeaderWithMenuAndUtils
];
