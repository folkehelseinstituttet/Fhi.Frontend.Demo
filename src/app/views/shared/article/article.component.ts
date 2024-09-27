import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { UrlService } from 'src/app/services/url.service';
import { UrlSegment } from 'src/app/url-segment.constants';
import { LibraryItemsDataService } from '../services/library-items-data.service';
import { LibraryItem, LibraryItemType } from '../models/library-item.model';

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
  LibraryItemType = LibraryItemType;

  constructor(
    private urlService: UrlService,
    private libraryItemsDataService: LibraryItemsDataService,
  ) {}

  ngOnInit() {
    this.subscription.add(
      this.urlService.URL$.subscribe(() => {
        this.currentSegment = this.urlService.getSegmentPath(1);
        this.rootLink = `/${UrlSegment.developer}/${this.currentSegment}/`;
        this.getCurrentArticleTitle();
      }),
    );
    this.subscription.add(
      this.libraryItemsDataService.getAllComponents().subscribe({
        next: (items) => {
          console.log(items);
          this.items = this.itemsFiltered = items;
        },
        error: (error) => error,
      }),
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getLibraryItemType(itemType: number) {
    const type = {
      [LibraryItemType.css]: 'CSS',
      [LibraryItemType.ngBootstrap]: 'NgBootstrap',
      [LibraryItemType.fhiAngular]: 'FhiAngular',
    };
    return type[itemType];
  }

  filterItems(value: string) {
    return this.items.filter((item) => {
      return this.fuzzySearch(value, item.title);
    });
  }

  private getCurrentArticleTitle() {
    if (this.urlService.getSegmentPath(1) === UrlSegment.visualIdentity) {
      this.title = 'Visuell identitet i FHI';
    } else {
      this.title = 'Komponenter';
    }
  }

  private fuzzySearch(needle: string, haystack: string) {
    const haystackLC = haystack.toLowerCase();
    const needleLC = needle.toLowerCase();

    const hlen = haystack.length;
    const nlen = needleLC.length;

    if (nlen > hlen) {
      return false;
    }
    if (nlen === hlen) {
      return needleLC === haystackLC;
    }
    outer: for (let i = 0, j = 0; i < nlen; i++) {
      const nch = needleLC.charCodeAt(i);

      while (j < hlen) {
        if (haystackLC.charCodeAt(j++) === nch) {
          continue outer;
        }
      }
      return false;
    }
    return true;
  }
}
