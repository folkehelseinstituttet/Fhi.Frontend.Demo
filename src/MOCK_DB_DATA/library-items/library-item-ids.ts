import { AccordionIds } from "./accordion/_accordion.ids"
import { AdvancedSelectIds } from "./advanced-select/_advanced-select.ids"
import { AlertsIds } from "./alerts/_alerts.ids"
import { BadgeIds } from "./badge/_badge.ids"
import { BreadcrumbIds } from "./breadcrumb/_breadcrumb.ids"
import { ButtonGroupIds } from "./button-group/_button-group.ids"
import { ButtonsIds } from "./buttons/_buttons.ids"
import { ColorIds } from "./color/_color.ids"
import { DateAndTimeIds } from "./date-and-time/_date-and-time.ids"
import { DatePickerIds } from "./datepicker/_datepicker.ids"
import { DrawerIds } from "./drawer/_drawer.ids"
import { FormsIds } from "./forms/_forms.ids"
import { GlobalFooterIds } from "./global-footer/_global-footer.ids"
import { GlobalHeaderIds } from "./global-header/_global-header.ids"
import { IconsIds } from "./icons/_icons.ids"
import { LayoutTemplatesIds } from "./layout-templates/_layout-templates.ids"
import { ModalIds } from "./modal/_modal.ids"
import { NavigationTileIds } from "./navigation-tile/_navigation-tile.ids"
import { PaginationIds } from "./pagination/_pagination.ids"
import { PrototypeFormIds } from "./prototype-forms/_prototype-form.ids"
import { PrototypePageheaderIds } from "./prototype-pageheader/_prototype-pageheader.ids"
import { PrototypeTableWithExpandableContentIds } from "./prototype-table-with-expandable-content/_prototype-table-with-expandable-content.ids"
import { SearchIds } from "./search/_search.ids"
import { SpinnersIds } from "./spinners/_spinners.ids"
import { TableIds } from "./table/_table.ids"
import { TabsIds } from "./tabs/_tabs.ids"
import { TagsIds } from "./tags/_tags.ids"
import { ToastIds } from "./toast/_toast.ids"
import { TooltipIds } from "./tooltip/_tooltip.ids"
import { TreeViewIds } from "./tree-view/_treeview.ids"
import { TypographyIds } from "./typography/_typography.ids"

const libraryItemIds = {
  ...AccordionIds,
  ...AdvancedSelectIds,
  ...AlertsIds,
  ...BadgeIds,
  ...ButtonGroupIds,
  ...BreadcrumbIds,
  ...ButtonsIds,
  ...ColorIds,
  ...DateAndTimeIds,
  ...DatePickerIds,
  ...DrawerIds,
  ...FormsIds,
  ...GlobalFooterIds,
  ...GlobalHeaderIds,
  ...IconsIds,
  ...LayoutTemplatesIds,
  ...ModalIds,
  ...NavigationTileIds,
  ...PaginationIds,
  ...PrototypeFormIds,
  ...PrototypePageheaderIds,
  ...PrototypeTableWithExpandableContentIds,
  ...SearchIds,
  ...SpinnersIds,
  ...TableIds,
  ...TabsIds,
  ...TagsIds,
  ...ToastIds,
  ...TooltipIds,
  ...TreeViewIds,
  ...TypographyIds
}

export const LibraryItemIds = (() => {
  let n = 0;
  Object.keys(libraryItemIds).forEach((key) => {
    libraryItemIds[key] = 'library-item-' + ++n;
  });
  return libraryItemIds;
})();
