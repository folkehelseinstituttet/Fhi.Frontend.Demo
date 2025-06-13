export interface FhiPopoverItem {
  action?: string;
  disabled?: boolean;
  link?: { href: string; download?: boolean };
  icon?: string;
  name: string;
  routerLink?: string;
}
