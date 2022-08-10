import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ViewportScroller } from '@angular/common';

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

  title: string;
  id: string;
  exampleHtml: string;
  codeMarkdown: string;
  documentationHtml: string;
  activeNavTab = 0;
  navTabs: NavTab[];

  ngOnInit() {
    this.updateExampleDataFromInput(this.libraryExample);
    this.navTabs = this.createNavTabsArray();
  }

  ngAfterViewInit() {
    if (this.activatedRoute.snapshot.fragment === this.id) {
      this.viewportScroller.scrollToAnchor(this.id);
    }
  }

  private updateExampleDataFromInput(example: LibraryExample) {
    this.title = example.title;
    this.id = example.id;
    this.exampleHtml = example.exampleHtml;
    this.codeMarkdown = this.getCodeMarkdown(example);
    this.documentationHtml = example.documentationHtml;
  }

  private getCodeMarkdown(example: LibraryExample): string {
    if (example.codeMarkdown !== undefined) {
      return example.codeMarkdown.trim();
    }
    if (example.exampleHtml !== undefined) {
      return example.exampleHtml.trim();
    }
    return '<!-- codeMarkdown === undefined -->';
  }

  private updateDocumentationMarkdown(example: LibraryExample): string | undefined {
    if (example.documentationMarkdown !== undefined) {
      return example.documentationMarkdown.trim();
    }
    return undefined;
  }

  private createNavTabsArray(): NavTab[] {
    let n = 0;
    const navTabs: NavTab[] = [];

    navTabs[n] = {
      id: n++,
      title: 'Example',
      content: this.codeMarkdown
    };
    if (this.documentationHtml !== undefined) {
      navTabs[n] = {
        id: n++,
        title: 'Documentation',
        content: this.documentationHtml
      };
    }
    navTabs[n] = {
      id: n++,
      title: 'Code',
      content: 'this.exampleHtml'
    };
    return navTabs;
  }

}
