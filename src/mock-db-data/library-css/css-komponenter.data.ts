import { LibraryExample } from 'src/app/shared/models/library-example.model';

import { FhiBtnPrimary } from './komponenter/fhi-btn-primary';
import { FhiBtnSecondary } from './komponenter/fhi-btn-secondary';
import { FhiBtnFlat } from './komponenter/fhi-btn-flat';
import { FhiBtnShortcut } from './komponenter/fhi-btn-shorcut';
import { FormInput } from './komponenter/form-input';
import { FormCheckboxRadio } from './komponenter/form-checkbox-radio';
import { FormInputValidation } from './komponenter/form-input-valdation';
import { FormSelect } from './komponenter/form-select';

export const CssKomponenterData: LibraryExample[] = [
  ...FhiBtnPrimary,
  ...FhiBtnSecondary,
  ...FhiBtnFlat,
  ...FhiBtnShortcut,
  ...FormInput,
  ...FormCheckboxRadio,
  ...FormInputValidation,
  ...FormSelect
];


