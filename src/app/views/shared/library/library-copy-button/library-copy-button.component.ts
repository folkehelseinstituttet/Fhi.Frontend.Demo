import { Component, Input } from '@angular/core';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { IClipboardResponse } from 'ngx-clipboard';

@Component({
  selector: 'app-library-copy-button',
  templateUrl: './library-copy-button.component.html'
})
export class LibraryCopyButtonComponent {

  @Input() contentToCopy: any;

  faCopy = faCopy;
  copyIsSuccess = false;
  tooltipCopyInital = 'Copy to clipboard';
  tooltipCopyIsSuccess = 'Copied!';

  tooltipOpen(tooltip: NgbTooltip) {
    this.copyIsSuccess = false;
    tooltip.open();
  }

  copied(event: IClipboardResponse) {
    console.log('event', event);
    this.copyIsSuccess = event.isSuccess;
  }
}
