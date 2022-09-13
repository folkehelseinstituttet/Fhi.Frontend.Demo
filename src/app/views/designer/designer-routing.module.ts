import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SegmentPaths } from 'src/app/segment-paths';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DesignerRoutingModule { }
