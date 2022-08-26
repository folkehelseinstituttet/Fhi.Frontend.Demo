import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-accordion-example',
  templateUrl: './accordion-example.component.html'
})
export class AccordionExampleComponent {
  @Input() title!: string;
}
