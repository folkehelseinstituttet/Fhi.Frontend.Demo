import { LibraryItem } from 'src/app/views/shared/library/models/library-item.model';

import { BtnPrimary } from './btn-primary';
import { BtnSecondary } from './btn-secondary';
import { BtnFlat } from './btn-flat';

export const ButtonsData: LibraryItem[] = [
  ...BtnPrimary,
  ...BtnSecondary,
  ...BtnFlat
];


