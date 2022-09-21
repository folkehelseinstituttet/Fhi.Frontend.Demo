import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

import { AccordionData } from 'src/MOCK_DB_DATA/library-items/accordion/_accordion.data';
import { AlertsData } from 'src/MOCK_DB_DATA/library-items/alerts/_alerts.data';
import { BadgeData } from 'src/MOCK_DB_DATA/library-items/badge/_badge.data';
import { ButtonsData } from 'src/MOCK_DB_DATA/library-items/buttons/_buttons.data';
import { ColorData } from 'src/MOCK_DB_DATA/library-items/color/_color.data';
import { FormsData } from 'src/MOCK_DB_DATA/library-items/forms/_forms.data';
import { IconsData } from 'src/MOCK_DB_DATA/library-items/icons/_icons.data';
import { ModalData } from 'src/MOCK_DB_DATA/library-items/modal/_modal.data';
import { NavigationData } from 'src/MOCK_DB_DATA/library-items/navigation/_navigation.data';
import { PaginationData } from 'src/MOCK_DB_DATA/library-items/pagination/_pagination.data';
import { SearchData } from 'src/MOCK_DB_DATA/library-items/search/_search.data';
import { TableData } from 'src/MOCK_DB_DATA/library-items/table/_table.data';
import { TagsData } from 'src/MOCK_DB_DATA/library-items/tags/_tags.data';
import { ToastData } from 'src/MOCK_DB_DATA/library-items/toast/_toast.data';
import { TooltipData } from 'src/MOCK_DB_DATA/library-items/tooltip/_tooltip.data';
import { TypographyData } from 'src/MOCK_DB_DATA/library-items/typography/_typography.data';

@Injectable({
  providedIn: 'root'
})
export class MockDbService implements InMemoryDbService {
  createDb(): object {
    return {
      AccordionData,
      AlertsData,
      BadgeData,
      ButtonsData,
      ColorData,
      FormsData,
      IconsData,
      ModalData,
      NavigationData,
      PaginationData,
      SearchData,
      TableData,
      TagsData,
      ToastData,
      TooltipData,
      TypographyData
    };
  }
}
