import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UrlPaths } from './_common/constants/url-paths';

const defaultPath = `/${UrlPaths.developer}/${UrlPaths.components}`;

const routes: Routes = [{
  path: '',
  pathMatch: 'full',
  redirectTo: defaultPath
}, {
  path: UrlPaths.developer,
  loadChildren: () => import('./views/developer/developer.module').then(m => m.DeveloperModule)
}, {
  path: '**',
  redirectTo: defaultPath
}];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
