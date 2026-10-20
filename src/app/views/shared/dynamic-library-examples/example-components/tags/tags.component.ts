import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { LibraryItemsShared } from '../../../models/library-item.model';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false,
})
export class TagsComponent {
  @Input() itemId!: string;
  @Input() items!: LibraryItemsShared;

  filterActive = true;
}
