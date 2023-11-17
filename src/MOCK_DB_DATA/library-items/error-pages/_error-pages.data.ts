import { LibraryItem, LibraryItemGroup } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemGroupsSharedData as GROUPS } from '../library-item-groups-shared-data';

import { ErrorPagesIntro } from './_error-pages.intro';

import { ErrorPage404 } from './error-page-400';
import { ErrorPage500 } from './error-page-500';

export const ErrorPages: LibraryItem[] = [...ErrorPage404, ...ErrorPage500];

export const ErrorPagesData: LibraryItemGroup = {
  id: GROUPS.ErrorPages.id,
  title: GROUPS.ErrorPages.title,
  intro: ErrorPagesIntro,
  libraryItems: ErrorPages,
};
