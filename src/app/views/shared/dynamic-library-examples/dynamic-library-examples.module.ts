import { NgModule } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';

import { SharedModule } from 'src/app/shared/shared.module';

import { DynamicLibraryExampleComponent } from './dynamic-library-example.component';

import { AccordionExampleComponent } from './ng-bootstrap-examples/accordion-example/accordion-example.component';
import { AlertDismissibleExampleComponent } from './ng-bootstrap-examples/alert-dismissible-example/alert-dismissible-example.component';
import { DatepickerExampleComponent } from './ng-bootstrap-examples/datepicker/datepicker.component';
import { LayoutExpandableFistColExampleComponent } from './fhi-angular-examples/layout-expandable-fist-col-example/layout-expandable-first-col-example.component';
import { ModalExampleComponent } from './ng-bootstrap-examples/modal-example/modal-example.component';
import { PaginationExampleComponent } from './ng-bootstrap-examples/pagination-example/pagination-example.component';
import { TabsExampleComponent } from './ng-bootstrap-examples/tabs-example/tabs-example.component';
import { ToastExampleComponent } from './ng-bootstrap-examples/toast-example/toast-example.component';
import { TooltipExampleComponent } from './ng-bootstrap-examples/tooltip-example/tooltip-example.component';

import { AdvancedSelectExampleComponent } from './fhi-angular-examples/advanced-select-example/advanced-select-example.component';
import { DateAndTimeSelectionExampleComponent } from './fhi-angular-examples/date-and-time-selection-examples/date-and-time-selection-example.component';
import { GlobalHeaderWithMenuExampleComponent } from './fhi-angular-examples/global-header-with-menu/global-header-with-menu.component';
import { SearchExampleComponent } from './fhi-angular-examples/search-example/search-example.component';
import { TagExampleComponent } from './fhi-angular-examples/tag-example/tag-example.component';
import { TreeViewExampleComponent } from './fhi-angular-examples/tree-view-example/tree-view-example.component';

import { PrototypePageheaderExampleComponent } from './fhi-angular-examples/prototype-pageheader/prototype-pageheader.component';

const NGB_EXAMPLES = [
  AccordionExampleComponent,
  AlertDismissibleExampleComponent,
  DatepickerExampleComponent,
  LayoutExpandableFistColExampleComponent,
  ModalExampleComponent,
  PaginationExampleComponent,
  TabsExampleComponent,
  ToastExampleComponent,
  TooltipExampleComponent
];

const FHI_EXAMPLES = [
  AdvancedSelectExampleComponent,
  DateAndTimeSelectionExampleComponent,
  GlobalHeaderWithMenuExampleComponent,
  PrototypePageheaderExampleComponent,
  SearchExampleComponent,
  TagExampleComponent,
  TreeViewExampleComponent
];

@NgModule({
  declarations: [
    DynamicLibraryExampleComponent,
    ...NGB_EXAMPLES,
    ...FHI_EXAMPLES
  ],
  imports: [
    NgSelectModule,
    SharedModule,
  ],
  exports: [
    NgSelectModule,
    DynamicLibraryExampleComponent,
    ...NGB_EXAMPLES,
    ...FHI_EXAMPLES
  ]
})
export class DynamicLibraryExamplesModule { }
