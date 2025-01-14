import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Input({ required: true }) items: Array<FhiPopoverItem>;
  @Input() triggerIcon = 'three-dots-vertical';
  @Output() actionEvent = new EventEmitter<string>();

  popperOptions = (options: Partial<Options>) => {
    (options.placement = 'bottom-end'), 'auto';

    options.onFirstUpdate = (state) => {
      if (state.elements?.arrow) {
        state.elements.arrow.style.display = 'none';
      }
    };
    return options;
  };

  buttonAction(action: string) {
    this.actionEvent.emit(action);
  }
}
