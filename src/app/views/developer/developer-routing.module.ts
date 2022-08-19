import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UrlPaths } from 'src/app/url-paths';

import { DeveloperComponent } from './developer.component';
import { ListOfVariationsComponent } from './list-of-variations/list-of-variations.component';
import { LibraryItemComponent } from './library-item/library-item.component';

const routes: Routes = [{
  path: ':param',
  component: DeveloperComponent
}, {
  path: '',
  pathMatch: 'full',
  redirectTo: `${UrlPaths.components}`
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeveloperRoutingModule {
  static components = [
    DeveloperComponent,
    ListOfVariationsComponent,
    LibraryItemComponent
  ];
}
