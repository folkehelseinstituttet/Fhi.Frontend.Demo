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

       // TODO: BEM-block, eg.: ds-library-item-full-srceen
      windowClass: 'ds-ui-documentation__modal-window',

      scrollable: true,
      fullscreen: true
    });
  }

}
