import { Component, Input } from '@angular/core';

import { LibraryItemsShared } from '../../../models/library-item.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modals',
  templateUrl: './modals.component.html',
})
export class ModalsComponent {
  @Input() itemId!: string;
  @Input() items!: LibraryItemsShared;

  closeResult = '';

  constructor(private modalService: NgbModal) {}

  open(content: any, openSize = 'md') {
    this.modalService.open(content, { size: openSize, scrollable: true });
  }

  openFullscreen(content: any) {
    this.modalService.open(content, { fullscreen: true });
  }
}
