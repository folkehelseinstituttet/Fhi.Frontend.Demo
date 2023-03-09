export interface FhiTreeViewNavigationNode {
  children?: FhiTreeViewNavigationNode[];
  href?: string;
  id?: string;
  isActive?: boolean;
  isExpanded?: boolean;
  hasActiveDescendant?: boolean;
  name: string;
  routerLink?: string;
}
