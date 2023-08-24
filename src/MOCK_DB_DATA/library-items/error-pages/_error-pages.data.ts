import { LibraryItem, LibraryItemGroup } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemGroupsSharedData } from '../library-item-groups-shared-data';

import { ErrorPagesIntro } from './_error-pages.intro';

import { ErrorPage404 } from './404';
import { ErrorPage500 } from './500';

export const ErrorPagesItems: LibraryItem[] = [
  ...ErrorPage404,
  ...ErrorPage500
];

export const ErrorPagesGroupData: LibraryItemGroup = {
  id: LibraryItemGroupsSharedData.ErrorPages.id,
  title: LibraryItemGroupsSharedData.ErrorPages.title,
  intro: ErrorPagesIntro,
  libraryItems: ErrorPagesItems
};
