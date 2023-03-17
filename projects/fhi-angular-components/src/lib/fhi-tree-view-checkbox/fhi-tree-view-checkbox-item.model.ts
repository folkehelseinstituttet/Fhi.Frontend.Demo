export interface FhiTreeViewCheckboxItem {
  children?: FhiTreeViewCheckboxItem[];
  href?: string;
  id?: number | string;
  isActive?: boolean;
  isExpanded?: boolean;
  hasActiveDescendant?: boolean;
  name: string;
  routerLink?: string;
}
