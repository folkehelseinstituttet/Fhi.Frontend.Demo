import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UrlPaths } from '../_common/constants/url-paths';
import { LibraryAngularComponent } from './library-angular.component';
import { DefaultExamplesComponent } from './default-examples/default-examples.component';

const routes: Routes = [{
  path: '',
  component: LibraryAngularComponent,

  children: [{
    path: ':param',
    component: DefaultExamplesComponent
  }, {
    path: '',
    pathMatch: 'full',
    redirectTo: `${UrlPaths.angularBibliotekSharedComponents}`
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LibraryAngularRoutingModule {
  static components = [
    LibraryAngularComponent,
    DefaultExamplesComponent
  ];
}
