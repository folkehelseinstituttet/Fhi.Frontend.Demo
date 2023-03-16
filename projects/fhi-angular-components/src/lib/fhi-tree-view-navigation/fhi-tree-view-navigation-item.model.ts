export interface FhiTreeViewNavigationItem {
  children?: FhiTreeViewNavigationItem[];
  href?: string;
  id?: number | string;
  isActive?: boolean;
  isExpanded?: boolean;
  hasActiveDescendant?: boolean;
  name: string;
  routerLink?: string;
}
