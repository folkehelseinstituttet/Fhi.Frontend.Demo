export interface FhiTreeViewCheckboxItem {
  children?: FhiTreeViewCheckboxItem[];
  descendantStateConfirmed?: boolean;
  id?: number | string;
  isChecked?: boolean;
  isExpanded?: boolean;
  hasCheckedDescendant?: boolean;
  name: string;
}
