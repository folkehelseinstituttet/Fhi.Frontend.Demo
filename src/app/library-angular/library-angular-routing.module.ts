import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UrlPaths } from '../_common/constants/url-paths';
import { LibraryAngularComponent } from './library-angular.component';

const routes: Routes = [{
  path: ':param',
  component: LibraryAngularComponent,
}, {
  path: '',
  pathMatch: 'full',
  redirectTo: `${UrlPaths.angularBibliotekNgBootstrap}`
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LibraryAngularRoutingModule {
  static components = [
    LibraryAngularComponent
  ];
}
