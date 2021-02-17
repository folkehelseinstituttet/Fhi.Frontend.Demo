import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

import { AngularNgbEksemplerData } from 'src/mock-db-data/library-angular/angular-ngb-eksempler.data';
import { AngularFontAwesomeEksemplerData } from 'src/mock-db-data/library-angular/angular-font-awesome-eksempler.data';

import { CssSidemalerData } from 'src/mock-db-data/library-css/css-sidemaler.data';
import { CssModulerData } from 'src/mock-db-data/library-css/css-moduler.data';
import { CssKomponenterData } from 'src/mock-db-data/library-css/css-komponenter.data';
import { CssFargerSkriftData } from 'src/mock-db-data/library-css/css-farger-skrift.data';
import { CssIkonerData } from 'src/mock-db-data/library-css/css-ikoner.data';


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
