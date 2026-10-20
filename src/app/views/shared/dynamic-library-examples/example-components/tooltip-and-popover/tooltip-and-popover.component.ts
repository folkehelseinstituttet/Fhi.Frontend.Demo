import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { LibraryItemsShared } from '../../../models/library-item.model';

@Component({
  selector: 'app-tooltip-and-popover',
  templateUrl: './tooltip-and-popover.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false,
})
export class TooltipAndPopoverComponent {
  @Input() itemId!: string;
  @Input() items!: LibraryItemsShared;
}
