import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { TreeModule } from '@ali-hm/angular-tree-component';

import { FhiAngularTreeViewBuilderComponent } from './fhi-angular-tree-view-builder.component';


@NgModule({
  declarations: [
    FhiAngularTreeViewBuilderComponent
  ],
  imports: [
    TreeModule,
    FormsModule
  ],
  exports: [
    FhiAngularTreeViewBuilderComponent
  ]
})
export class FhiAngularTreeViewBuilderModule { }
