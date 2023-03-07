export interface FhiTreeViewNavigationNode {
  children?: FhiTreeViewNavigationNode[];
  hasActiveChild?: boolean;
  isActive?: boolean;
  link?: string;
  name: string;
}
