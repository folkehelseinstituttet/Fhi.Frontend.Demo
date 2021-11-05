import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

import { AngularNgbEksemplerData } from 'src/mock-db-data/library-angular/angular-ngb-examples.data';
import { AngularFontAwesomeEksemplerData } from 'src/mock-db-data/library-angular/angular-font-awesome-examples.data';

import { CssSidemalerData } from 'src/mock-db-data/library-css/css-page-templates.data';
import { CssModulerData } from 'src/mock-db-data/library-css/css-modules.data';
import { CssKomponenterData } from 'src/mock-db-data/library-css/css-components.data';
import { CssFargerSkriftData } from 'src/mock-db-data/library-css/css-colors-fonts.data';
import { CssIkonerData } from 'src/mock-db-data/library-css/css-icons.data';


@Injectable({
  providedIn: 'root'
})
export class MockDbService implements InMemoryDbService {
  createDb(): object {
    return {
      AngularNgbEksemplerData,
      AngularFontAwesomeEksemplerData,

      CssSidemalerData,
      CssModulerData,
      CssKomponenterData,
      CssFargerSkriftData,
      CssIkonerData
    };
  }
}
