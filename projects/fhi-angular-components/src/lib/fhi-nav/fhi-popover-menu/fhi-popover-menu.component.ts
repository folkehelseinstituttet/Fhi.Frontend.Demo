import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';

import { FhiPopoverItem } from './fhi-popover-menu.model';

@Component({
  selector: 'fhi-popover-menu',
  standalone: true,
  imports: [CommonModule, NgbPopoverModule],
  templateUrl: './fhi-popover-menu.component.html',
})
export class FhiPopoverMenuComponent {
  @Input() items: FhiPopoverItem;
}
