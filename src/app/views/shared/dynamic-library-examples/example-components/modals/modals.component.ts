import { Component, Input } from '@angular/core';

import { LibraryItemsShared } from '../../../models/library-item.model';
import { FhiModalActionButton } from '@folkehelseinstituttet/angular-components';

@Component({
  selector: 'app-modals',
  templateUrl: './modals.component.html',
})
export class ModalsComponent {
  @Input() itemId!: string;
  @Input() items!: LibraryItemsShared;

  actionButtons: FhiModalActionButton[] = [
    { name: 'Handling x', disabled: true },
    { name: 'Handling 2' },
    { name: 'Handling 1' },
  ];

  onModalAction(action: string) {
    console.info('onModalAction:', action);
  }
}
