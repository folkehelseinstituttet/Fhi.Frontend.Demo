import { LibraryExample } from 'src/app/shared/models/library-example.model';

import { NgbDatepickerArrow } from './ngb-eksempler/ngb-datepicker/ngb-datepicker-arrow';
import { NgbDatepickerSelect } from './ngb-eksempler/ngb-datepicker/ngb-datepicker-select';

export const AngularNgbEksemplerData: LibraryExample[] = [
  ...NgbDatepickerArrow,
  ...NgbDatepickerSelect
];
