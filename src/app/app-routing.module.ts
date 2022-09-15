import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SegmentPaths } from './segment-paths';

const defaultPath = `/${SegmentPaths.developer}/${SegmentPaths.components}/${SegmentPaths.accordion}`;

const routes: Routes = [{
  path: '',
  pathMatch: 'full',
  redirectTo: defaultPath
}, {
  path: SegmentPaths.developer,
  loadChildren: () => import('./views/developer/developer.module').then(m => m.DeveloperModule)
}, {
  path: SegmentPaths.designer,
  loadChildren: () => import('./views/designer/designer.module').then(m => m.DesignerModule)
}, {
  path: '**',
  redirectTo: defaultPath
}];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
