import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

import { AccordionData } from 'src/MOCK_DB_DATA/library-items/accordion/_accordion.data';
import { AlertsData } from 'src/MOCK_DB_DATA/library-items/alerts/_alerts.data';
import { ButtonsData } from 'src/MOCK_DB_DATA/library-items/buttons/_buttons.data';
import { ColorData } from 'src/MOCK_DB_DATA/library-items/color/_color.data';
import { FormsData } from 'src/MOCK_DB_DATA/library-items/forms/_forms.data';
import { IconsData } from 'src/MOCK_DB_DATA/library-items/icons/_icons.data';
import { ModalData } from 'src/MOCK_DB_DATA/library-items/modal/_modal.data';
import { PaginationData } from 'src/MOCK_DB_DATA/library-items/pagination/_pagination.data';
import { TableData } from 'src/MOCK_DB_DATA/library-items/table/_table.data';
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
      ButtonsData,
      ColorData,
      FormsData,
      IconsData,
      ModalData,
      PaginationData,
      TableData,
      ToastData,
      TooltipData,
      TypographyData
    };
  }
}
