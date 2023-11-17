import { LibraryItem, LibraryItemGroup } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemGroupsSharedData as GROUPS } from '../library-item-groups-shared-data';

import { AlertsIntro } from './_alerts.intro';

import { AlertBasic } from './alert-basic';
import { AlertClosable } from './alert-closable';

const Alerts: LibraryItem[] = [...AlertBasic, ...AlertClosable];

export const AlertsData: LibraryItemGroup = {
  id: GROUPS.Alerts.id,
  title: GROUPS.Alerts.title,
  titleLang: GROUPS.Alerts.titleLang,
  intro: AlertsIntro,
  libraryItems: Alerts,
};
