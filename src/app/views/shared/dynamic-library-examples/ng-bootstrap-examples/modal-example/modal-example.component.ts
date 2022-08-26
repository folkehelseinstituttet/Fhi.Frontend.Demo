import { Component } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-example',
  templateUrl: './modal-example.component.html'
})
export class ModalExampleComponent {
  closeResult = '';

  constructor(private modalService: NgbModal) {}

  open(content, openSize = 'md') {
    this.modalService.open(content, { size: openSize, scrollable: true });
  }

}
