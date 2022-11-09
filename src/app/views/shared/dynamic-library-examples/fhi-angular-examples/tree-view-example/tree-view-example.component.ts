import { Component, Input } from '@angular/core';
import { TreeModule } from '@circlon/angular-tree-component';

@Component({
  selector: 'app-tree-view-example',
  templateUrl: './tree-view-example.component.html'
})
export class TreeViewExampleComponent {
  @Input() itemId!: string;
  @Input() itemIds!: any;
}
