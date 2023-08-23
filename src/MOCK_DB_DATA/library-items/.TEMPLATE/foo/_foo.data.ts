import { LibraryItem, LibraryItemGroup } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemGroupsSharedData as GROUPS } from '../library-item-groups-shared-data';

import { FooIntro } from './_foo.intro';

import { FooBar } from './foo-bar';
import { FooBaz } from './foo-baz';

const FooItems: LibraryItem[] = [
  ...FooBar,
  ...FooBaz
];

export const FooData: LibraryItemGroup = {
  id: GROUPS.Foo.id,
  title: GROUPS.Foo.title,
  intro: FooIntro,
  libraryItems: FooItems
};
