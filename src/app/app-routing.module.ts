import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UrlSegment } from './url-segment.constants';

const defaultPath = `/${UrlSegment.developer}/${UrlSegment.components}`;

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: defaultPath,
  },
  {
    path: UrlSegment.developer,
    loadChildren: () => import('./views/developer/developer.module').then((m) => m.DeveloperModule),
    // }, {
    //   path: UrlSegment.designer,
    //   loadChildren: () => import('./views/designer/designer.module').then(m => m.DesignerModule)
  },
  {
    path: '**',
    redirectTo: defaultPath,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
