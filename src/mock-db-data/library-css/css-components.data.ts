import { LibraryExample } from 'src/app/shared/models/library-example.model';

import { Accordion } from './components/accordion';
import { FhiBtnPrimary } from './components/fhi-btn-primary';
import { FhiBtnSecondary } from './components/fhi-btn-secondary';
import { FhiBtnFlat } from './components/fhi-btn-flat';
// import { FhiBtnShortcut } from './komponenter/fhi-btn-shorcut';
import { FormInput } from './components/form-input';
import { FormTextarea } from './components/form-textarea';
import { FormRadio } from './components/form-radio';
import { FormSwitch } from './components/form-switch'
import { FormCheckbox } from './components/form-checkbox';
import { FormInputValidation } from './components/form-input-valdation';
import { FormSelect } from './components/form-select';
import { Pagination } from './components/pagination';
import { TableSimple } from './components/table-simple';
import { TableSortable } from './components/table-sortable';

export const CssComponentsData: LibraryExample[] = [
  ...Accordion,
  ...FhiBtnPrimary,
  ...FhiBtnSecondary,
  ...FhiBtnFlat,
  // ...FhiBtnShortcut,
  ...FormCheckbox,
  ...FormRadio,
  ...FormSwitch,
  ...FormInput,
  ...FormInputValidation,
  ...FormTextarea,
  ...FormSelect,
  ...Pagination,
  ...TableSimple,
  ...TableSortable
];


