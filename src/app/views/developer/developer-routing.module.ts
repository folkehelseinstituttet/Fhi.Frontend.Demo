import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UrlSegment } from 'src/app/url-segment.constants';

import { ArticleComponent } from '../shared/article/article.component';
import { DeveloperComponent } from './developer.component';
import { ListOfVariationsComponent } from './list-of-variations/list-of-variations.component';
import { LibraryItemComponent } from './library-item/library-item.component';
import { LibraryItemFullSrceenComponent } from './library-item-full-srceen/library-item-full-srceen.component';

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
  redirectTo: UrlSegment.components
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
    LibraryItemComponent,
    LibraryItemFullSrceenComponent
  ];
}
