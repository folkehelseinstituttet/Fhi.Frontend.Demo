import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { UrlService } from '../../_common/services/url.service';
import { UrlPaths } from '../../_common/constants/url-paths';
import { DefaultExamplesDataService } from './default-examples-data.service';
import { LibraryExample } from '../../shared/models/library-example.model';
import { AngularComponents } from '../constants/library-angular-components';

@Component({
  selector: 'app-default-examples',
  templateUrl: './default-examples.component.html'
})
export class DefaultExamplesComponent implements OnInit, OnDestroy {

  constructor(
    private urlService: UrlService,
    private defaultExamplesDataService: DefaultExamplesDataService
  ) { }

  private subscription: Subscription = new Subscription();

  urlPaths = UrlPaths;

  libraryExamples: LibraryExample[];
  libraryExamplesLoaded = false;
  currentLibraryMenuLevel1Path: string;

  ngOnInit(): void {
    this.currentLibraryMenuLevel1Path = this.urlService.urlSegmenter[1].path;
    this.getLibraryExamples(this.currentLibraryMenuLevel1Path);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private getLibraryExamples(path: string): void {
    this.libraryExamplesLoaded = false;
    this.subscription.add(this.defaultExamplesDataService.getLibraryExamples(path)
      .subscribe(libraryExamples => {
        this.libraryExamples = libraryExamples;
        this.addAngularComponent(this.libraryExamples).then(examplesWithComponents => {
          this.libraryExamples = examplesWithComponents;
          this.libraryExamplesLoaded = true;
        })

      },
        error => this.getErrorMessage(error)));
  }

  private getErrorMessage(error: object): void {
    console.log(error);
  }

  private async addAngularComponent(libraryExamples: LibraryExample[]): Promise<LibraryExample[]> {
    return await Promise.all(libraryExamples.map(async libraryExample => {
      if (libraryExample.componentFolder && libraryExample.angularComponentClassName) {
        libraryExample.angularComponentType = AngularComponents[libraryExample.angularComponentClassName];

        if (libraryExample.angularComponentType) {
          const htmlExample = await this.defaultExamplesDataService.getHtmlFile(libraryExample.componentFolder).toPromise()
          const typeScriptExample = await this.defaultExamplesDataService.getTypeScriptFile(libraryExample.componentFolder).toPromise()
          libraryExample.exampleHtml = htmlExample;
          libraryExample.exampleTypeScript = typeScriptExample
          return libraryExample;
        }
          throw Error("LibraryExample mangler i 'AngularComponents'-konstanter eller har mismatch med 'angularComponentClassName'");
      }
      throw Error("LibraryExample har ingen type satt for 'AngularComponentType'");
    }));
  }

}
