export interface FhiTreeViewCheckboxItem {
  children?: FhiTreeViewCheckboxItem[];
  id?: number | string;
  isChecked?: boolean;
  isExpanded?: boolean;
  hasCheckedDescendant?: boolean;
  name: string;
}
