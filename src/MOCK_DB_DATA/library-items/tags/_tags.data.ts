import { LibraryItem } from 'src/app/views/shared/library/models/library-item.model';

import { TagCategory } from './tag-category';
import { TagState } from './tag-state';

export const TagsData: LibraryItem[] = [
  ...TagCategory,
  ...TagState
];


