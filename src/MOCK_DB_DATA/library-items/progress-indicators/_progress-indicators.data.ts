import { LibraryItem, LibraryItemGroup } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemGroupsSharedData as GROUPS } from '../library-item-groups-shared-data';

import { ProgressIndicatorsIntro } from './_progress-indicators.intro';

import { ProgressBar } from './progress-bar';
import { ProgressSpinner } from './spinner';
import { ProgressSpinnerButton } from './spinner-button';
import { ProgressSpinnerFlex } from './spinner-flex';
import { ProgressSpinnerMargin } from './spinner-margin';
import { ProgressSpinnerSmall } from './spinner-small';

export const ProgressIndicators: LibraryItem[] = [
  ...ProgressBar,
  ...ProgressSpinner,
  ...ProgressSpinnerSmall,
  ...ProgressSpinnerFlex,
  ...ProgressSpinnerMargin,
  ...ProgressSpinnerButton,
];

export const ProgressIndicatorsData: LibraryItemGroup = {
  id: GROUPS.ProgressIndicators.id,
  title: GROUPS.ProgressIndicators.title,
  intro: ProgressIndicatorsIntro,
  libraryItems: ProgressIndicators,
};
