import { LibraryItem } from 'src/app/views/shared/models/library-item.model';

import { Checkbox } from './checkbox';
import { CheckboxTile } from './checkbox-tile';
import { Validation } from './valdation';
import { Input } from './input';
import { Radio } from './radio';
import { RadioButtonTile } from './radio-button-tile';
import { Select } from './select';
import { Switch } from './switch';
import { Textarea } from './textarea';

export const FormsData: LibraryItem[] = [
  ...Input,
  ...Validation,
  ...Textarea,
  ...Select,
  ...Checkbox,
  ...CheckboxTile,
  ...Radio,
  ...RadioButtonTile,
  ...Switch
];
