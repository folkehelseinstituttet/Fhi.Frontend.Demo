import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SegmentPaths } from 'src/app/segment-path';

import { DesignerComponent } from './designer.component';

const routes: Routes = [{
  path: ':param',
  component: DesignerComponent,
}, {
  path: '',
  pathMatch: 'full',
  redirectTo: SegmentPaths.components
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DesignerRoutingModule {
  static components = [
    DesignerComponent
  ];
}
