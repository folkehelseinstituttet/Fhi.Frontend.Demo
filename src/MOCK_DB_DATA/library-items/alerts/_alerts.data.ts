import { LibraryItem } from 'src/app/views/shared/models/library-item.model';

import { Alert } from './alert';
import { AlertDismissible } from './alert-dismissable';

export const AlertsData: LibraryItem[] = [
  ...Alert,
  ...AlertDismissible
];
