import { HtmlParser } from '@angular/compiler';
import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

// import { LibraryItem, LibraryItemType } from '../../../shared/models/library-item.model';

@Component({
  selector: 'app-library-item-full-screen-button',
  templateUrl: './library-item-full-screen-button.component.html',
})
export class LibraryItemFullScreenButtonComponent implements OnInit {
  @Input() itemMarkup: any;

  constructor(private modal: NgbModal) {}

  ngOnInit() {}

  previewItemInContext(modalContent: any, size: string, fullscreen: boolean) {
    this.modal.open(modalContent, {
      windowClass: 'ds-ui-documentation__modal-window',
      scrollable: true,
      size: size,
      fullscreen: fullscreen,
    });
  }
}
