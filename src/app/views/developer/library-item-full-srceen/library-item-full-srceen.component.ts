import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-library-item-full-srceen',
  templateUrl: './library-item-full-srceen.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false,
})
export class LibraryItemFullSrceenComponent {
  constructor(private modal: NgbModal) {}

  openModal(content: any) {
    this.modal.open(content, {
      windowClass: 'ds-modal',
      scrollable: true,
      fullscreen: true,
    });
  }
}
