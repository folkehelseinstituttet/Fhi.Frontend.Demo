import { LibraryItem } from 'src/app/views/shared/models/library-item.model';

import { AdvancedSelectAutosuggest } from './advanced-select-autosuggest';
import { AdvancedSelectMultiselect } from './advanced-select-multiselect';

export const AdvancedSelectData: LibraryItem[] = [
  ...AdvancedSelectAutosuggest,
  ...AdvancedSelectMultiselect
];
