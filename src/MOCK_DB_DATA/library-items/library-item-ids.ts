import { AccordionIds } from "./accordion/_accordion.ids"
import { AdvancedSelectIds } from "./advanced-select/_advanced-select.ids"
import { AlertsIds } from "./alerts/_alerts.ids"
import { BadgeIds } from "./badge/_badge.ids"
import { BreadcrumbIds } from "./breadcrumb/_breadcrumb.ids"
import { ButtonsIds } from "./buttons/_buttons.ids"
import { ColorIds } from "./color/_color.ids"
import { FormsIds } from "./forms/_forms.ids"
import { IconsIds } from "./icons/_icons.ids"
import { ModalIds } from "./modal/_modal.ids"
import { NavigationTileIds } from "./navigation-tile/_navigation-tile.ids"
import { PaginationIds } from "./pagination/_pagination.ids"
import { SearchIds } from "./search/_search.ids"
import { TableIds } from "./table/_table.ids"
import { TabsIds } from "./tabs/_tabs.ids"
import { TagsIds } from "./tags/_tags.ids"
import { ToastIds } from "./toast/_toast.ids"
import { TooltipIds } from "./tooltip/_tooltip.ids"
import { TypographyIds } from "./typography/_typography.ids"

const libraryItemIds = {
  ...AccordionIds,
  ...AdvancedSelectIds,
  ...AlertsIds,
  ...BadgeIds,
  ...BreadcrumbIds,
  ...ButtonsIds,
  ...ColorIds,
  ...FormsIds,
  ...IconsIds,
  ...ModalIds,
  ...NavigationTileIds,
  ...PaginationIds,
  ...SearchIds,
  ...TableIds,
  ...TabsIds,
  ...TagsIds,
  ...ToastIds,
  ...TooltipIds,
  ...TypographyIds
}

export const LibraryItemIds = (() => {
  let n = 0;
  Object.keys(libraryItemIds).forEach((key) => {
    libraryItemIds[key] = 'library-item-' + ++n;
  });
  return libraryItemIds;
})();
