import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DeveloperComponent } from './developer.component';
import { UrlPaths } from 'src/app/url-paths';

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
  static components = [DeveloperComponent];
}
