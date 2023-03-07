export interface FhiTreeViewNavigationNode {
  children?: FhiTreeViewNavigationNode[];
  hasActiveChild?: boolean;
  href?: string;
  isActive?: boolean;
  name: string;
  routerLink?: string;
}
