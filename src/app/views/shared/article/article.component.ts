import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { UrlService } from 'src/app/services/url.service';
import { UrlSegment } from 'src/app/url-segment.constants';
import { LibraryItemsDataService } from '../services/library-items-data.service';
import {
  LibraryItem,
  LibraryItemDependencyType,
  LibraryItemType,
} from '../models/library-item.model';
import { FormBuilder, FormGroup } from '@angular/forms';

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
  dependencyTypes = [
    {
      id: LibraryItemDependencyType.css,
      name: 'CSS',
      selected: true,
    },
    {
      id: LibraryItemDependencyType.ngBootstrap,
      name: 'NgBootstrap',
      selected: true,
    },
    {
      id: LibraryItemDependencyType.fhiAngular,
      name: 'FhiAngular',
      selected: true,
    },
  ];
  form: FormGroup;

  constructor(
    private urlService: UrlService,
    private libraryItemsDataService: LibraryItemsDataService,
    private fb: FormBuilder,
  ) {
    this.form = this.fb.group({
      search: this.fb.control(''),
      types: this.buildTypes(),
    });
    console.log('this.form', this.form);
  }

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
    return this.dependencyTypes[itemType].name;
  }

  filterItems() {
    const searchValue = this.form.get('search').value;
    const typesSelected = this.form.get('types').value;
    let filtered: LibraryItem[] = [];
    filtered = this.items;

    if (!typesSelected[LibraryItemDependencyType.css]) {
      filtered = filtered.filter((item) => item.dependencyType !== LibraryItemDependencyType.css);
    }
    if (!typesSelected[LibraryItemDependencyType.ngBootstrap]) {
      filtered = filtered.filter(
        (item) => item.dependencyType !== LibraryItemDependencyType.ngBootstrap,
      );
    }
    if (!typesSelected[LibraryItemDependencyType.fhiAngular]) {
      filtered = filtered.filter(
        (item) => item.dependencyType !== LibraryItemDependencyType.fhiAngular,
      );
    }
    filtered = filtered.filter((item) => {
      return this.fuzzySearch(searchValue, item.title);
    });
    this.itemsFiltered = filtered;
  }

  private getCurrentArticleTitle() {
    if (this.urlService.getSegmentPath(1) === UrlSegment.visualIdentity) {
      this.title = 'Visuell identitet i FHI';
    } else {
      this.title = 'Komponenter';
    }
  }

  private buildTypes() {
    const array = this.dependencyTypes.map((type) => {
      return this.fb.control(type.selected);
    });
    return this.fb.array(array);
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
