import { Component, OnInit, Input, ComponentFactoryResolver, ViewChild } from '@angular/core';

import { LibraryExample } from '../../shared/models/library-example.model';
import { AngularComponentDirective } from '../directives/angular-component.directive';
import { LibraryExampleNavModel } from '../../library-angular-dynamic/models/library-example-nav.model';

@Component({
  selector: 'app-library-example-detail-dynamic',
  templateUrl: './library-example-detail-dynamic.component.html'
})
export class LibraryExampleDynamicDetailComponent implements OnInit {

  @Input() libraryExample: LibraryExample;
  @ViewChild(AngularComponentDirective, {static: true}) appExampleAngularComponentHost: AngularComponentDirective;

  constructor(private componentFactoryResolver: ComponentFactoryResolver){}

  title: string;
  id: string;
  exampleHtml: string;
  codeMarkdown: string;
  isExampleAngularComponent: boolean;

  ngOnInit(): void {
    this.title = this.libraryExample.title;
    this.id = this.libraryExample.id;
    this.exampleHtml = this.libraryExample.exampleHtml;
    this.codeMarkdown = this.getCodeMarkdown();
    this.isExampleAngularComponent = this.libraryExample.angularComponentType !== undefined;
    this.loadExampleAngularComponent();
  }

  get libraryExampleNavModels(): LibraryExampleNavModel[] {
    return [
      { id: 0, title: 'Komponent', isAngularComponent: true },
      { id: 1, title: 'Html', content: this.libraryExample.exampleHtml, isAngularComponent: false, fileType: 'html' },
      { id: 2, title: 'Html', content: this.libraryExample.exampleTypeScript, isAngularComponent: false, fileType: 'js' }
    ];
  }

  loadExampleAngularComponent(): void {
    if (this.isExampleAngularComponent) {
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.libraryExample.angularComponentType);
      const viewContainerRef = this.appExampleAngularComponentHost.viewContainerRef;
      viewContainerRef.clear();

      // componentRef er nå instansen av angular komponenten, her kan en legge inn @input osv.
      const componentRef = viewContainerRef.createComponent(componentFactory);
    }
  }

  private getCodeMarkdown(): string {
    let markdown: string;
    if (this.libraryExample.codeMarkdown) {
      markdown = this.libraryExample.codeMarkdown;
    } else {
      markdown = this.libraryExample.exampleHtml;
    }
    return markdown.trim();
  }
}
