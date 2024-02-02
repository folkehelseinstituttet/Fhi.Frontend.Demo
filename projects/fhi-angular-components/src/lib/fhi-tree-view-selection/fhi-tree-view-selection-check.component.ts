import { Component, Input } from '@angular/core';

import { FhiTreeViewSelectionComponent } from './fhi-tree-view-selection.component';
import { FhiTreeViewSelectionItem as Item } from './fhi-tree-view-selection-item.model';

@Component({
  selector: 'fhi-tree-view-selection-check',
  standalone: true,
  imports: [FhiTreeViewSelectionComponent],
  templateUrl: './fhi-tree-view-selection-check.component.html',
})
export class FhiTreeViewSelectionCheckComponent {
  @Input() enableCheckAll = false;
  @Input() items: Item[];
}
