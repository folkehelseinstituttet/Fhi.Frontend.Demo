import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { UrlService } from 'src/app/services/url.service';
import { UrlSegment } from 'src/app/url-segment.constants';
import { LibraryItem } from '../models/library-item.model';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
})
export class ArticleComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();

  title: string;
  articleHtml: string;
  currentSegment: string;
  urlSegment = UrlSegment;
  items: LibraryItem[] = [];
  itemsFiltered: LibraryItem[] = [];
  rootLink!: string;

  constructor(private urlService: UrlService) {}

  ngOnInit() {
    this.subscription.add(
      this.urlService.URL$.subscribe(() => {
        this.currentSegment = this.urlService.getSegmentPath(1);
        this.rootLink = `/developer/${this.currentSegment}/`;
        this.getCurrentArticleTitle();
      }),
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private getCurrentArticleTitle() {
    if (this.urlService.getSegmentPath(1) === UrlSegment.visualIdentity) {
      this.title = 'Visuell identitet i FHI';
    } else {
      this.title = 'Komponenter';
    }
  }
}
