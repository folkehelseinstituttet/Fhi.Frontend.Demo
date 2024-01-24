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
    { name: 'Handling 2', enabled: false },
    { name: 'Handling 2', enabled: true },
    { name: 'Handling 1', enabled: true },
  ];

  onModalAction(action: string) {
    console.info('onModalAction:', action);
  }
}
