import { Component, Input } from '@angular/core';
import { LibraryItemsShared } from '../../../models/library-item.model';

@Component({
  selector: 'app-angular-tree-view-builder',
  templateUrl: './angular-tree-view-builder.component.html',
})
export class AngularTreeViewBuilderComponent {
  @Input() itemId!: string;
  @Input() items!: LibraryItemsShared;
}
