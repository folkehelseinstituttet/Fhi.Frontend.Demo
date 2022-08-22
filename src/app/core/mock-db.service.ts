import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

import { LibrarySecondLevelMenuData } from 'src/MOCK_DB_DATA/library-second-level-menu.data';

import { CssPageTemplatesData } from 'src/MOCK_DB_DATA/library-css/css-page-templates.data';
import { CssModulesData } from 'src/MOCK_DB_DATA/library-css/css-modules.data';
import { CssComponentsData } from 'src/MOCK_DB_DATA/library-css/css-components.data';
import { CssColorsFontsData } from 'src/MOCK_DB_DATA/library-css/css-colors-fonts.data';
import { CssIconsData } from 'src/MOCK_DB_DATA/library-css/css-icons.data';


@Injectable({
  providedIn: 'root'
})
export class MockDbService implements InMemoryDbService {
  createDb(): object {
    return {
      LibrarySecondLevelMenuData,

      CssPageTemplatesData,
      CssModulesData,
      CssComponentsData,
      CssColorsFontsData,
      CssIconsData
    };
  }
}
