import { LibraryItem, LibraryItemGroup } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemGroupsSharedData as GROUPS } from '../library-item-groups-shared-data';

import { FormControlsIntro } from './_form-controls.intro';

import { FormControlInput } from './form-control-input';
import { FormControlValidation } from './form-control-validation';
import { FormControlTextarea } from './form-control-textarea';
import { FormControlCheckbox } from './form-control-checkbox';
import { FormControlRadio } from './form-control-radio';
import { FormControlCheckboxTile } from './form-control-checkbox-tile';
import { FormControlRadioTile } from './form-control-radio-tile';
import { FormControlSelect } from './form-control-select';
import { FormControlMultiselect } from './form-control-multiselect';
import { FormControlAutosuggest } from './form-control-autosuggest';
import { FormControlSwitch } from './form-control-switch';

const FormControls: LibraryItem[] = [
  ...FormControlInput,
  ...FormControlTextarea,
  ...FormControlCheckbox,
  ...FormControlRadio,
  ...FormControlCheckboxTile,
  ...FormControlRadioTile,
  ...FormControlSelect,
  ...FormControlMultiselect,
  ...FormControlAutosuggest,
  ...FormControlSwitch,
  ...FormControlValidation,
];

export const FormControlsData: LibraryItemGroup = {
  id: GROUPS.FormControls.id,
  title: GROUPS.FormControls.title,
  intro: FormControlsIntro,
  libraryItems: FormControls,
};
