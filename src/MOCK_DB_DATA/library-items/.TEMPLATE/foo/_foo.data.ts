import { LibraryItem, LibraryItemGroup } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemGroupsSharedData } from '../library-item-groups-shared-data';

import { FooSectionIntro } from './_foo.intro';

import { FooBar } from './foo-bar';
import { FooBaz } from './foo-baz';

export const FooItems: LibraryItem[] = [
  ...FooBar,
  ...FooBaz
];

export const FooGroupData: LibraryItemGroup = {
  id: LibraryItemGroupsSharedData.Foo.id,
  title: LibraryItemGroupsSharedData.Foo.title,
  intro: FooSectionIntro,
  libraryItems: FooItems
};
