import { FhiTreeViewSelectionItemInternal } from './fhi-tree-view-selection-item-internal.model';

export interface FhiTreeViewSelectionItem
  extends Omit<FhiTreeViewSelectionItemInternal, 'internal'> {
  children?: FhiTreeViewSelectionItem[];
  id?: number | string;
}
