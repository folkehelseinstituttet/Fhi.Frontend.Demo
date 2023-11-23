import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tooltip-and-popover-example',
  templateUrl: './tooltip-and-popover-example.component.html',
})
export class TooltipExampleComponent {
  @Input() itemId!: string;
  @Input() itemIds!: any;
}
