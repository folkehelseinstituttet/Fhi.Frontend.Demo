import { LibraryItem } from 'src/app/views/shared/library/models/library-item.model';

import { Pagination } from './components/pagination';
import { Toast } from './components/toast';
import { Tooltip } from './components/tooltip';

export const CssComponentsData: LibraryItem[] = [
  ...Pagination,
  ...Toast,
  ...Tooltip,
];


