import { LibraryExample } from 'src/app/shared/models/library-example.model';

import { FhiBtnPrimary } from './komponenter/fhi-btn-primary';
import { FhiBtnSecondary } from './komponenter/fhi-btn-secondary';
import { FhiBtnFlat } from './komponenter/fhi-btn-flat';
import { FhiBtnShortcut } from './komponenter/fhi-btn-shorcut';
import { FormInput } from './komponenter/form-input';
import { FormTextarea } from './komponenter/form-textarea';
import { FormRadio } from './komponenter/form-radio';
import { FormCheckbox } from './komponenter/form-checkbox';
import { FormInputValidation } from './komponenter/form-input-valdation';
import { FormSelect } from './komponenter/form-select';
import { Pagination } from './komponenter/pagination';

export const CssKomponenterData: LibraryExample[] = [
  ...FhiBtnPrimary,
  ...FhiBtnSecondary,
  ...FhiBtnFlat,
  ...FhiBtnShortcut,
  ...FormCheckbox,
  ...FormRadio,
  ...FormInput,
  ...FormInputValidation,
  ...FormTextarea,
  ...FormSelect,
  ...Pagination
];


