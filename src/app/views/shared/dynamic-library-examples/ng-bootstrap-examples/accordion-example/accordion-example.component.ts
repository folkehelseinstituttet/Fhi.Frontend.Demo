import { Component, Input } from '@angular/core';

import { LibraryItemIds } from '../../../library/library-item-ids';

@Component({
  selector: 'app-accordion-example',
  templateUrl: './accordion-example.component.html'
})
export class AccordionExampleComponent {

  @Input() itemId!: string;

  itemIds = LibraryItemIds;
}
