import { LibraryItem } from 'src/app/views/shared/models/library-item.model';

import { Pagination } from './pagination';
import { PaginationCollectionCounter } from './pagination-collection-counter';

export const PaginationData: LibraryItem[] = [...Pagination, ...PaginationCollectionCounter];
