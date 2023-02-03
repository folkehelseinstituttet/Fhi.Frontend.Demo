import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UrlSegment } from 'src/app/url-segment.constants';

import { ArticleComponent } from '../shared/article/article.component';
import { DesignerComponent } from './designer.component';

const routes: Routes = [{
  path: ':param',
  component: DesignerComponent,
  children: [{
    path: '',
    component: ArticleComponent
  }]
}, {
  path: '',
  pathMatch: 'full',
  redirectTo: UrlSegment.visualIdentity
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DesignerRoutingModule {
  static components = [
    DesignerComponent
  ];
}
