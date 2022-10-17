import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-library-item-full-srceen',
  templateUrl: './library-item-full-srceen.component.html'
})
export class LibraryItemFullSrceenComponent {

  constructor(private modal: NgbModal) { }

  openModal(conten: any) {
    this.modal.open(conten, {
      backdropClass: 'ds-ngb-modal-backdrop',
      windowClass: 'ds-ui-documentation__modal-window', // TODO: BEM-block
      scrollable: true,
      fullscreen: true
    });
  }

}
