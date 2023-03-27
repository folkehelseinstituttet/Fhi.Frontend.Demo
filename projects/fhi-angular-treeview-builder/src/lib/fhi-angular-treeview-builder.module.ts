import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { TreeModule } from '@circlon/angular-tree-component';
import { FhiAngularTreeviewBuilderComponent } from './fhi-angular-treeview-builder.component';



@NgModule({
  declarations: [
    FhiAngularTreeviewBuilderComponent
  ],
  imports: [
    TreeModule,
    FormsModule
  ],
  exports: [
    FhiAngularTreeviewBuilderComponent
  ]
})
export class FhiAngularTreeviewBuilderModule { }
