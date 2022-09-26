import { AccordionIds } from "src/MOCK_DB_DATA/library-items/accordion/_accordion.ids"
import { AdvancedSelectIds } from "src/MOCK_DB_DATA/library-items/advanced-select/_advanced-select.ids"
import { AlertsIds } from "src/MOCK_DB_DATA/library-items/alerts/_alerts.ids"
import { BadgeIds } from "src/MOCK_DB_DATA/library-items/badge/_badge.ids"
import { ButtonsIds } from "src/MOCK_DB_DATA/library-items/buttons/_buttons.ids"
import { ColorIds } from "src/MOCK_DB_DATA/library-items/color/_color.ids"
import { FormsIds } from "src/MOCK_DB_DATA/library-items/forms/_forms.ids"
import { IconsIds } from "src/MOCK_DB_DATA/library-items/icons/_icons.ids"
import { ModalIds } from "src/MOCK_DB_DATA/library-items/modal/_modal.ids"
import { NavigationTileIds } from "src/MOCK_DB_DATA/library-items/navigation-tile/_navigation-tile.ids"
import { PaginationIds } from "src/MOCK_DB_DATA/library-items/pagination/_pagination.ids"
import { SearchIds } from "src/MOCK_DB_DATA/library-items/search/_search.ids"
import { TableIds } from "src/MOCK_DB_DATA/library-items/table/_table.ids"
import { TagsIds } from "src/MOCK_DB_DATA/library-items/tags/_tags.ids"
import { ToastIds } from "src/MOCK_DB_DATA/library-items/toast/_toast.ids"
import { TooltipIds } from "src/MOCK_DB_DATA/library-items/tooltip/_tooltip.ids"
import { TypographyIds } from "src/MOCK_DB_DATA/library-items/typography/_typography.ids"

const libraryItemIds = {
  ...AccordionIds,
  ...AdvancedSelectIds,
  ...AlertsIds,
  ...BadgeIds,
  ...ButtonsIds,
  ...ColorIds,
  ...FormsIds,
  ...IconsIds,
  ...ModalIds,
  ...NavigationTileIds,
  ...PaginationIds,
  ...SearchIds,
  ...TableIds,
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
