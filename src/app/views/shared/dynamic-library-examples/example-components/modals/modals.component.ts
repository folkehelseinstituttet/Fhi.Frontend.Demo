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

  modalParentAction: string;

  onModalAction(action: string) {
    console.info('onModalAction:', action);
  }

  onPopoverActionOpenModalFromParent(action: string) {
    if (action === 'openModal') {
      this.modalParentAction = 'openModal';
    }
  }

  onDismissModal() {
    this.modalParentAction = undefined;
  }
}
