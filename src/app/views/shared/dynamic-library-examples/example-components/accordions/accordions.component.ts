import { Component, Input } from '@angular/core';

import { LibraryItemsShared } from '../../../models/library-item.model';

@Component({
    selector: 'app-accordions',
    templateUrl: './accordions.component.html',
    standalone: false
})
export class AccordionsComponent {
  @Input() itemId!: string;
  @Input() items!: LibraryItemsShared;

  accordionItems = ['1', '2', '3'];
}
