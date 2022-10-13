import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-library-item-full-screen-button',
  templateUrl: './library-item-full-screen-button.component.html',
  styleUrls: ['./library-item-full-screen-button.component.scss']
})
export class LibraryItemFullScreenButtonComponent implements OnInit {

  constructor(private modal: NgbModal) { }

  ngOnInit(): void {
  }

  previewMobile(modalContent: any) {
    this.modal.open(modalContent, {
      windowClass: 'ds-ui-documentation__modal-window',
      scrollable: true,
      size: 'sm'
    });
  }
}
