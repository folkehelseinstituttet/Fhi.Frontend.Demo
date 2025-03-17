import { Component, Input } from '@angular/core';
import { LibraryItemsShared } from '../../../models/library-item.model';

@Component({
    selector: 'app-tags',
    templateUrl: './tags.component.html',
    standalone: false
})
export class TagsComponent {
  @Input() itemId!: string;
  @Input() items!: LibraryItemsShared;

  filterActive = true;
}
