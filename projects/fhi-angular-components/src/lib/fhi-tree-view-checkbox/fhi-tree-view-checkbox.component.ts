import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

import { FhiTreeViewCheckboxItem } from './fhi-tree-view-checkbox-item.model';

@Component({
  selector: 'fhi-tree-view-checkbox',
  templateUrl: './fhi-tree-view-checkbox.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FhiTreeViewCheckboxComponent {

  @Input() items: FhiTreeViewCheckboxItem[] = [];

}
