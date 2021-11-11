import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

import { AngularNgbExamplesData } from 'src/mock-db-data/library-angular/angular-ngb-examples.data';
import { AngularFontAwesomeExamplesData } from 'src/mock-db-data/library-angular/angular-font-awesome-examples.data';

import { CssPageTemplatesData } from 'src/mock-db-data/library-css/css-page-templates.data';
import { CssModulesData } from 'src/mock-db-data/library-css/css-modules.data';
import { CssComponentsData } from 'src/mock-db-data/library-css/css-components.data';
import { CssColorsFontsData } from 'src/mock-db-data/library-css/css-colors-fonts.data';
import { CssIconsData } from 'src/mock-db-data/library-css/css-icons.data';


@Injectable({
  providedIn: 'root'
})
export class MockDbService implements InMemoryDbService {
  createDb(): object {
    return {
      AngularNgbExamplesData,
      AngularFontAwesomeExamplesData,

      CssPageTemplatesData,
      CssModulesData,
      CssComponentsData,
      CssColorsFontsData,
      CssIconsData
    };
  }
}
