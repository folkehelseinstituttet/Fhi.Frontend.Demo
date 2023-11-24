import { Component, Input } from '@angular/core';

import { LibraryItemsShared } from '../../../models/library-item.model';

@Component({
  selector: 'app-navs',
  templateUrl: './navs.component.html',
})
export class NavsComponent {
  @Input() itemId!: string;
  @Input() items!: LibraryItemsShared;
}
