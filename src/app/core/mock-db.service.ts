import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

import { AccordionData } from 'src/MOCK_DB_DATA/library-items/accordion/_accordion.data';
import { ColorData } from 'src/MOCK_DB_DATA/library-items/color/_color.data';
import { IconsData } from 'src/MOCK_DB_DATA/library-items/icons/_icons.data';
import { TableData } from 'src/MOCK_DB_DATA/library-items/table/_table.data';

import { CssComponentsData } from 'src/MOCK_DB_DATA/library-css/css-components.data';
import { CssColorsFontsData } from 'src/MOCK_DB_DATA/library-css/css-colors-fonts.data';


@Injectable({
  providedIn: 'root'
})
export class MockDbService implements InMemoryDbService {
  createDb(): object {
    return {
      AccordionData,
      ColorData,
      IconsData,
      TableData,

      CssComponentsData,
      CssColorsFontsData
    };
  }
}
