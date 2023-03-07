import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FhiTreeViewNavigationComponent } from './fhi-tree-view-navigation.component';

@NgModule({
  declarations: [
    FhiTreeViewNavigationComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    FhiTreeViewNavigationComponent
  ]
})
export class FhiTreeViewNavigationModule { }
