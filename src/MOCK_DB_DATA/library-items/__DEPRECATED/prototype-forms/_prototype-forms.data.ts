import { LibraryItem, LibraryItemGroup } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemGroupsSharedData as GROUPS } from '../library-item-groups-shared-data';

import { PrototypeFormsIntro } from './_prototype-forms.intro';

import { PrototypeForm } from './prototype-form';

export const PrototypeForms: LibraryItem[] = [...PrototypeForm];

export const PrototypeFormsData: LibraryItemGroup = {
  id: GROUPS.PrototypeForms.id,
  title: GROUPS.PrototypeForms.title,
  intro: PrototypeFormsIntro,
  libraryItems: PrototypeForms,
};
