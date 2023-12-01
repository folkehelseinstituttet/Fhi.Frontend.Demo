import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UrlSegment } from 'src/app/url-segment.constants';

import { ArticleComponent } from '../shared/article/article.component';
import { DeveloperComponent } from './developer.component';
import { LibraryItemsSectionComponent } from './library-items-section/library-items-section.component';

const routes: Routes = [
  {
    path: ':param',
    component: DeveloperComponent,
    children: [
      {
        path: '',
        component: ArticleComponent,
      },
      {
        path: ':param',
        component: LibraryItemsSectionComponent,
      },
    ],
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: UrlSegment.components,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeveloperRoutingModule {
  static components = [ArticleComponent, DeveloperComponent, LibraryItemsSectionComponent];
}
