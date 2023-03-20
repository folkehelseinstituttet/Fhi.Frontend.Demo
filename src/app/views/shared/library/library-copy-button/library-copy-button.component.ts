import { Component, Input } from '@angular/core';

import { Clipboard } from '@angular/cdk/clipboard';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-library-copy-button',
  templateUrl: './library-copy-button.component.html'
})
export class LibraryCopyButtonComponent {

  @Input() contentToCopy: any;

  tooltipText = 'Kopier';

  constructor(private clipboard: Clipboard) {}

  copy(contentToCopy: any) {
    this.tooltipText = 'Kopiert!';
    this.clipboard.copy(contentToCopy);
  }

  tooltipOpen(tooltip: NgbTooltip) {
    this.tooltipText = 'Kopier';
    tooltip.open();
  }
}
