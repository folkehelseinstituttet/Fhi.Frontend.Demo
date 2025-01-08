interface InternalItemProps {
  id: string;
}

export interface FhiTreeViewSelectionItem {
  children?: FhiTreeViewSelectionItem[];
  internal?: InternalItemProps;
  isChecked?: boolean;
  isExpanded?: boolean;
  hasCheckedDescendant?: boolean;
  name: string;
  [key: string]: unknown;
}
