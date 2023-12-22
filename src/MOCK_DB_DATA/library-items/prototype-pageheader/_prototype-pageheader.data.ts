import { LibraryItem, LibraryItemGroup } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemGroupsSharedData as GROUPS } from '../library-item-groups-shared-data';

import { PrototypePageheaderIntro } from './_prototype-pageheader.intro';

import { PrototypePageheader } from './prototype-pageheader';

export const PrototypePageheaders: LibraryItem[] = [...PrototypePageheader];

export const PrototypePageheaderData: LibraryItemGroup = {
  id: GROUPS.PrototypePageheaders.id,
  title: GROUPS.PrototypePageheaders.title,
  intro: PrototypePageheaderIntro,
  libraryItems: PrototypePageheaders,
};
