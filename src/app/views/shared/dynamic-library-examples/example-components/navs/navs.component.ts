import { Component, Input } from '@angular/core';

import { LibraryItemsShared } from '../../../models/library-item.model';

@Component({
  selector: 'app-navs',
  templateUrl: './navs.component.html',
})
export class NavsComponent {
  @Input() itemId!: string;
  @Input() items!: LibraryItemsShared;

  popoverMenuItems = [
    {
      href: '/this-item.doc',
      icon: 'download',
      name: 'Last ned',
      type: 'download',
    },
    {
      href: '/developer/components/navs#popover-menu',
      icon: 'pencil',
      name: 'Rediger',
      routerLink: '/developer/components/navs#popover-menu',
    },
    {
      icon: 'trash3',
      name: 'Slett',
      type: 'button',
    },
  ];
}
