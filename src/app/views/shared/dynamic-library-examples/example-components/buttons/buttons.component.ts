import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';
import { LibraryItemsShared } from '../../../models/library-item.model';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-buttons',
  imports: [NgbDropdownModule, SharedModule],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './buttons.component.html',
})
export class ButtonsComponent {
  @Input() itemId!: string;
  @Input() items!: LibraryItemsShared;

  activeButton: number = 1;
  verticalGroup: boolean = false;
}
