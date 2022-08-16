import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ViewportScroller } from '@angular/common';

import { LibraryItem, LibraryItemType } from '../models/library-item.model';
import { NavTab } from './nav-tab.model';

@Component({
  selector: 'app-library-item-detail',
  templateUrl: './library-item-detail.component.html'
})
export class LibraryItemDetailComponent implements AfterViewInit, OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private viewportScroller: ViewportScroller
  ) { }

  @Input() libraryItem: LibraryItem;

  id: string;
  title: string;
  type: number;
  exampleHtml: string;
  documentationHtml: string;
  codeHtml: string;

  itemTypeHtml = LibraryItemType.html;
  activeNavTab = 0;
  navTabs: NavTab[];

  ngOnInit() {
    this.setItemData(this.libraryItem);
    this.navTabs = this.createNavTabsArray();
  }

  ngAfterViewInit() {
    if (this.activatedRoute.snapshot.fragment === this.id) {
      this.viewportScroller.scrollToAnchor(this.id);
    }
  }

  private setItemData(item: LibraryItem) {
    this.title = item.title;
    this.type = item.type;
    this.exampleHtml = item.exampleHtml;
    this.codeHtml = this.getCodeHtml(item);
    this.documentationHtml = item.documentationHtml;
    this.id = item.id;
  }

  private getCodeHtml(item: LibraryItem): string {
    if (item.codeHtml !== undefined) {
      return item.codeHtml.trim();
    }
    if (item.exampleHtml !== undefined) {
      return item.exampleHtml.trim();
    }
    return '<!-- codeHtml === undefined -->';
  }

  private createNavTabsArray(): NavTab[] {
    let n = 0;
    const navTabs: NavTab[] = [];

    navTabs[n] = {
      id: n++,
      title: 'Example'
    };
    if (this.documentationHtml !== undefined) {
      navTabs[n] = {
        id: n++,
        title: 'Documentation'
      };
    }
    navTabs[n] = {
      id: n++,
      title: 'Code'
    };
    return navTabs;
  }

}
