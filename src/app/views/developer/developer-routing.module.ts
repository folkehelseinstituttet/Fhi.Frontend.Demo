import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SegmentPaths } from 'src/app/segment-path';

import { ArticleComponent } from '../shared/article/article.component';
import { DeveloperComponent } from './developer.component';
import { ListOfVariationsComponent } from './list-of-variations/list-of-variations.component';
import { LibraryItemComponent } from './library-item/library-item.component';

const routes: Routes = [{
  path: ':param',
  component: DeveloperComponent,
  children: [{
    path: '',
    component: ArticleComponent
  }, {
    path: ':param',
    component: ListOfVariationsComponent
  }]
}, {
  path: '',
  pathMatch: 'full',
  redirectTo: SegmentPaths.components
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeveloperRoutingModule {
  static components = [
    ArticleComponent,
    DeveloperComponent,
    ListOfVariationsComponent,
    LibraryItemComponent
  ];
}
