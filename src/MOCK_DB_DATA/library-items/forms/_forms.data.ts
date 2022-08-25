import { LibraryItem } from 'src/app/views/shared/library/models/library-item.model';

import { Checkbox } from './checkbox';
import { Validation } from './valdation';
import { Input } from './input';
import { Radio } from './radio';
import { Select } from './select';
import { Switch } from './switch';
import { Textarea } from './textarea';

export const FormsData: LibraryItem[] = [
  ...Textarea,
  ...Switch,
  ...Select,
  ...Radio,
  ...Input,
  ...Checkbox,
  ...Validation
];


