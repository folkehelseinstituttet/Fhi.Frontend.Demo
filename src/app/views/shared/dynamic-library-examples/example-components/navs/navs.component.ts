import { Component, Input } from '@angular/core';

import { LibraryItemsShared } from '../../../models/library-item.model';

@Component({
    selector: 'app-navs',
    templateUrl: './navs.component.html',
    standalone: false
})
export class NavsComponent {
  @Input() itemId!: string;
  @Input() items!: LibraryItemsShared;

  popoverMenuItems = [
    {
      icon: 'download',
      link: {
        download: true,
        href: '/tomt-dokument.doc',
      },
      name: 'Last ned',
    },
    {
      icon: 'pencil',
      name: 'Rediger',
      routerLink: '/developer/components/navs',
    },
    {
      action: 'delete',
      icon: 'trash3',
      name: 'Slett',
    },
  ];

  action(action: string) {
    if (action === 'delete') {
      this.delete(action);
    }
  }

  delete(action: string) {
    console.info('Action: ' + '"' + action + '"' + ' is called');
  }
}
