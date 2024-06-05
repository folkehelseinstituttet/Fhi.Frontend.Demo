export interface FhiTreeViewSelectionItem {
  children?: FhiTreeViewSelectionItem[];
  id?: number | string;
  isChecked?: boolean;
  isExpanded?: boolean;
  hasCheckedDescendant?: boolean;
  name: string;
}
