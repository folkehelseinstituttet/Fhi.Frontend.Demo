import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tag-example',
  templateUrl: './tag-example.component.html'
})
export class TagExampleComponent {

  @Input() itemId!: string;

  filterActive = true;
}
