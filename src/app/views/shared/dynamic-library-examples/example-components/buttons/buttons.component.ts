import { Component, Input } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';
import { LibraryItemsShared } from '../../../models/library-item.model';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-buttons',
  standalone: true,
  imports: [NgbDropdownModule, SharedModule],
  templateUrl: './buttons.component.html',
})
export class ButtonsComponent {
  @Input() itemId!: string;
  @Input() items!: LibraryItemsShared;
}
