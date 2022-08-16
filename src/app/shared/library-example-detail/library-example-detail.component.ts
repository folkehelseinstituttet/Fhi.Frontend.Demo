import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ViewportScroller } from '@angular/common';

import { LibraryItemType } from 'src/app/library-css/constants/library-item-type';
import { LibraryExample } from '../models/library-example.model';
import { NavTab } from './nav-tab.model';

@Component({
  selector: 'app-library-example-detail',
  templateUrl: './library-example-detail.component.html'
})
export class LibraryExampleDetailComponent implements AfterViewInit, OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private viewportScroller: ViewportScroller
  ) { }

  @Input() libraryExample: LibraryExample;

  LibraryItemType = LibraryItemType;

  exampleTitle: string;
  exampleType: number;
  exampleId: string;
  exampleHtml: string;
  documentationHtml: string;
  codeHtml: string;

  activeNavTab = 0;
  navTabs: NavTab[];

  ngOnInit() {
    this.updateExampleDataFromInput(this.libraryExample);
    this.navTabs = this.createNavTabsArray();
  }

  ngAfterViewInit() {
    if (this.activatedRoute.snapshot.fragment === this.exampleId) {
      this.viewportScroller.scrollToAnchor(this.exampleId);
    }
  }

  private updateExampleDataFromInput(example: LibraryExample) {
    this.exampleTitle = example.title;
    this.exampleType = (example.type !== undefined) ? example.type : LibraryItemType.html;
    this.exampleHtml = example.exampleHtml;
    this.codeHtml = this.getCodeHtml(example);
    this.documentationHtml = example.documentationHtml;
    this.exampleId = example.id;
  }

  private getCodeHtml(example: LibraryExample): string {
    if (example.codeHtml !== undefined) {
      return example.codeHtml.trim();
    }
    if (example.exampleHtml !== undefined) {
      return example.exampleHtml.trim();
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
