import { LibraryItem, LibraryItemGroup } from 'src/app/views/shared/models/library-item.model';
import { LibraryItemGroupsSharedData as GROUPS } from '../library-item-groups-shared-data';

import { TooltipPopoverIntro } from './_tooltip-popover.intro';

import { Tooltip } from './tooltip';
import { TooltipPopover } from './popover';

export const TooltipPopovers: LibraryItem[] = [...Tooltip, ...TooltipPopover];

export const TooltipPopoverData: LibraryItemGroup = {
  id: GROUPS.TooltipPopovers.id,
  title: GROUPS.TooltipPopovers.title,
  intro: TooltipPopoverIntro,
  libraryItems: TooltipPopovers,
};
