import { Component, Input } from '@angular/core';

import { FhiTreeViewSelectionComponent } from './fhi-tree-view-selection.component';
import { FhiTreeViewSelectionItem as Item } from './fhi-tree-view-selection-item.model';

@Component({
  selector: 'fhi-tree-view-selection-radio',
  standalone: true,
  imports: [FhiTreeViewSelectionComponent],
  templateUrl: './fhi-tree-view-selection-radio.component.html',
})
export class FhiTreeViewSelectionRadioComponent {
  @Input() items: Item[];
  @Input({ required: true }) name: string;
}
