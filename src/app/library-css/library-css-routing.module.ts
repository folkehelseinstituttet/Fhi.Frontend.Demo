import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LibraryCssComponent } from './library-css.component';
import { UrlPaths } from '../_felles/konstanter/url-paths';

const routes: Routes = [{
  path: ':param',
  component: LibraryCssComponent
}, {
  path: '',
  pathMatch: 'full',
  redirectTo: `${UrlPaths.cssBibliotekKomponenter}`
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LibraryCssRoutingModule {
  static components = [
    LibraryCssComponent
  ];
}
