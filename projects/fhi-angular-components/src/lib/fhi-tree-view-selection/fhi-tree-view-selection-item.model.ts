export interface FhiTreeViewSelectionItem {
  children?: FhiTreeViewSelectionItem[];
  descendantStateConfirmed?: boolean;
  id?: number | string;
  isChecked?: boolean;
  isExpanded?: boolean;
  hasCheckedDescendant?: boolean;
  name: string;
}
