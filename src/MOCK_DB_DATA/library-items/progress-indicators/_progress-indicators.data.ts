import { LibraryItem } from 'src/app/views/shared/models/library-item.model';

import { ProgressBar } from './progress-bar';
import { Spinner } from './spinner';
import { SpinnerButton } from './spinner-button';
import { SpinnerFlex } from './spinner-flex';
import { SpinnerMargin } from './spinner-margin';
import { SpinnerSmall } from './spinner-small';

export const ProgressIndicatorsData: LibraryItem[] = [
  ...ProgressBar,
  ...Spinner,
  ...SpinnerSmall,
  ...SpinnerFlex,
  ...SpinnerMargin,
  ...SpinnerButton
];