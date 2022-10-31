import { Component, Input, TemplateRef } from '@angular/core';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-offcanvas-example',
  templateUrl: './offcanvas-example.component.html'
})
export class OffcanvasExampleComponent {
  @Input() itemId!: string;
  @Input() itemIds!: any;

  constructor(private offcanvasService: NgbOffcanvas) {}

  openCustomBackdropClass(content: TemplateRef<any>) {
		this.offcanvasService.open(content, { backdropClass: 'bg-info' });
	}
}
