import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UrlPaths } from './_common/constants/url-paths';

const defaultPath = `/${UrlPaths.cssBibliotek}/${UrlPaths.cssBibliotekKomponenter}`;

const routes: Routes = [{
  path: '',
  pathMatch: 'full',
  redirectTo: defaultPath
}, {
  path: UrlPaths.cssBibliotek,
  loadChildren: () => import('./library-css/library-css.module').then(m => m.LibraryCssModule)
}, {
  path: UrlPaths.angularBibliotek,
  loadChildren: () => import('./library-angular/library-angular.module').then(m => m.LibraryAngularModule)
}, {
  path: '**',
  redirectTo: defaultPath
}];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
