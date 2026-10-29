import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { LibraryItemsShared } from '../../../models/library-item.model';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false,
})
export class AlertsComponent {
  @Input() itemId!: string;
  @Input() items!: LibraryItemsShared;
}
