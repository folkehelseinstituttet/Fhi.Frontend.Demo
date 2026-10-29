import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { Clipboard } from '@angular/cdk/clipboard';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-library-copy-button',
  templateUrl: './library-copy-button.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false,
})
export class LibraryCopyButtonComponent {
  @Input() contentToCopy: string;

  tooltipText!: string;

  constructor(private clipboard: Clipboard) {}

  copy(contentToCopy: string) {
    if (this.clipboard.copy(contentToCopy)) {
      this.tooltipText = 'Kopiert!';
      this.clipboard.copy(contentToCopy);
    } else {
      this.tooltipText = 'Kopiering feilet';
    }
  }

  tooltipOpen(tooltip: NgbTooltip) {
    this.tooltipText = 'Kopier';
    tooltip.open();
  }
}
