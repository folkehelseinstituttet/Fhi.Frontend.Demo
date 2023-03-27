import { Component, Input } from '@angular/core';

import { FhiAngularTreeViewBuilderComponent } from '@folkehelseinstituttet/angular-tree-view-builder';

@Component({
  selector: 'app-angular-tree-view-builder-example',
  templateUrl: './angular-tree-view-builder-example.component.html'
})
export class AngularTreeViewBuilderExampleComponent {

  @Input() itemId!: string;
  @Input() itemIds!: any;

}
