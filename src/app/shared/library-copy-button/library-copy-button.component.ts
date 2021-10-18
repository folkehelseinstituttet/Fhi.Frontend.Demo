import { Component, Input, OnInit } from '@angular/core';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { IClipboardResponse } from 'ngx-clipboard';

@Component({
  selector: 'app-library-copy-button',
  templateUrl: './library-copy-button.component.html'
})
export class LibraryCopyButtonComponent implements OnInit {
  @Input() contentReferenceToCopy;
  constructor() { }

  faCopy = faCopy;
  copyIsSuccess = false;
  tooltipCopyInital = 'Copy to clipboard';
  tooltipCopyIsSuccess = 'Copied!';

  ngOnInit(): void {
  }

  tooltipOpen(tooltip: NgbTooltip): void {
    this.copyIsSuccess = false;
    tooltip.open();
  }

  copied(event: IClipboardResponse): void {
    this.copyIsSuccess = event.isSuccess;
  }
}
