export interface FhiTreeViewNavigationItem {
  active?: boolean;
  children?: FhiTreeViewNavigationItem[];
  hasActiveChild?: boolean;
  name: string;
  uri?: string;
}
