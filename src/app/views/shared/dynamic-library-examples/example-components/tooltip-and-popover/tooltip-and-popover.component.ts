import { Component, Input } from '@angular/core';
import { LibraryItemsShared } from '../../../models/library-item.model';

@Component({
  selector: 'app-tooltip-and-popover',
  templateUrl: './tooltip-and-popover.component.html',
})
export class TooltipAndPopoverComponent {
  @Input() itemId!: string;
  @Input() items!: LibraryItemsShared;
}
