export interface FhiTreeViewSelectionItemInternal {
  children?: FhiTreeViewSelectionItemInternal[];
  internal?: {
    id: string;
  };
  isChecked?: boolean;
  isExpanded?: boolean;
  hasCheckedDescendant?: boolean;
  name: string;
}
