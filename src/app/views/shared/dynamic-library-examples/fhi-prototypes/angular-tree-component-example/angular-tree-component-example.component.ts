import { Component, Input } from '@angular/core';

// import { FhiAngularTreeviewBuilderComponent } from 'projects/fhi-angular-treeview-builder/src/public-api';
import { FhiAngularTreeviewBuilderComponent } from '@folkehelseinstituttet/angular-treeview-builder';

@Component({
  selector: 'app-angular-tree-component-example',
  templateUrl: './angular-tree-component-example.component.html'
})
export class AngularTreeComponentExampleComponent {

  @Input() itemId!: string;
  @Input() itemIds!: any;

}
