import { LibraryItem, LibraryItemGroup } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemGroupsSharedData as Groups } from '../library-item-groups-shared-data';

import { FooIntro } from './_foo.intro';

import { FooBar } from './foo-bar';
import { FooBaz } from './foo-baz';

export const FooItems: LibraryItem[] = [
  ...FooBar,
  ...FooBaz
];

export const FooGroupData: LibraryItemGroup = {
  id: Groups.Foo.id,
  title: Groups.Foo.title,
  intro: FooIntro,
  libraryItems: FooItems
};
