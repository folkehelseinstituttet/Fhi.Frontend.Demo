import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { Options } from '@popperjs/core';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';

import { FhiPopoverItem } from './fhi-popover-menu.model';

@Component({
  selector: 'fhi-popover-menu',
  standalone: true,
  imports: [CommonModule, NgbPopoverModule, RouterModule],
  templateUrl: './fhi-popover-menu.component.html',
})
export class FhiPopoverMenuComponent {
  @Input() items: Array<FhiPopoverItem>;
  @Input() triggerIcon = 'three-dots-vertical';

  popperOptions = (options: Partial<Options>) => {
    (options.placement = 'bottom-end'), 'auto';

    for (const modifier of options.modifiers || []) {
      if (modifier.name === 'offset' && modifier.options) {
        // ref. &:not(.bs-popover-bottom-end) { in fhi-popover-menu.component.scss
        modifier.options.offset = () => [-24, -20];
      }
    }

    options.onFirstUpdate = (state) => {
      if (state.elements?.arrow) {
        state.elements.arrow.style.display = 'none';
      }
    };
    return options;
  };
}
