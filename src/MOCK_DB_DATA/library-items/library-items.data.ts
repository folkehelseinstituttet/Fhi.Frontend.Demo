import { LibraryItem } from 'src/app/views/shared/models/library-item.model';

import { CardData } from './cards/_cards.data';
import { DrawerData } from './drawer/_drawer.data';
import { GlobalHeaderData } from './global-header/_global-header.data';
import { ModalData } from './modal/_modal.data';
import { PaginationData } from './pagination/_pagination.data';
import { PrototypeAngularTreeData } from './prototype-angular-tree/_prototype-angular-tree.data';
import { PrototypeFormsData } from './prototype-forms/_prototype-forms.data';
import { PrototypePageheaderData } from './prototype-pageheader/_prototype-pageheader.data';
import { PrototypeTableWithExpandableContentData } from './prototype-table-with-expandable-content/_prototype-table-with-expandable-content.data';
import { SearchData } from './search/_search.data';
import { ProgressIndicatorsData } from './progress-indicators/_progress-indicators.data';
import { TableData } from './table/_table.data';
import { TagsData } from './tags/_tags.data';
import { ToastData } from './toast/_toast.data';
import { TootipPopoverData } from './tooltip-popover/_tooltip-popover.data';
import { TreeViewData } from './tree-view/_tree-view.data';

export const AllData: LibraryItem[] = [
  ...CardData,
  ...DrawerData,
  ...GlobalHeaderData,
  ...ModalData,
  ...PaginationData,
  ...PrototypeAngularTreeData,
  ...PrototypeFormsData,
  ...PrototypePageheaderData,
  ...PrototypeTableWithExpandableContentData,
  ...SearchData,
  ...ProgressIndicatorsData,
  ...TableData,
  ...TagsData,
  ...ToastData,
  ...TootipPopoverData,
  ...TreeViewData,
];
