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
import { TableExamplesComponent } from './fhi-angular-examples/table-examples/table-examples.component';
import { TabsExampleComponent } from './ng-bootstrap-examples/tabs-example/tabs-example.component';
import { ToastExampleComponent } from './ng-bootstrap-examples/toast-example/toast-example.component';
import { TooltipExampleComponent } from './ng-bootstrap-examples/tooltip-example/tooltip-example.component';

import { AdvancedSelectExampleComponent } from './fhi-angular-examples/advanced-select-example/advanced-select-example.component';
import { DateAndTimeExampleComponent } from './fhi-angular-examples/date-and-time-examples/date-and-time-example.component';
import { FhiAngularHighchartsExampleComponent } from './fhi-angular-examples/fhi-angular-highcharts-example/fhi-angular-highcharts-example.component';
import { FormElementExamplesComponent } from './fhi-angular-examples/form-element-examples/form-element-examples.component';
import { GlobalHeadersExampleComponent } from './fhi-angular-examples/global-headers/global-headers.component';
import { SearchExampleComponent } from './fhi-angular-examples/search-example/search-example.component';
import { TagExampleComponent } from './fhi-angular-examples/tag-example/tag-example.component';

import { TreeViewNavigationExampleComponent } from './fhi-angular-examples/tree-view-navigation-example/tree-view-naviagation-example.component';

import { PrototypeFormsComponent } from './fhi-prototypes/forms/forms.component';
import { PrototypePageheaderExampleComponent } from './fhi-prototypes/pageheader/pageheader.component';
import { TableWithExpandableContentComponent } from './fhi-prototypes/table-with-expandable-content/table-with-expandable-content.component';
import { AngularTreeComponentExampleComponent } from './fhi-prototypes/angular-tree-component-example/angular-tree-component-example.component';

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
  DateAndTimeExampleComponent,
  FhiAngularHighchartsExampleComponent,
  FormElementExamplesComponent,
  GlobalHeadersExampleComponent,
  SearchExampleComponent,
  TableExamplesComponent,
  TreeViewNavigationExampleComponent,
  TagExampleComponent
];

const FHI_PROTOTYPES = [
  AngularTreeComponentExampleComponent,
  PrototypeFormsComponent,
  PrototypePageheaderExampleComponent,
  TableWithExpandableContentComponent
];

@NgModule({
  declarations: [
    DynamicLibraryExampleComponent,
    ...NGB_EXAMPLES,
    ...FHI_EXAMPLES,
    ...FHI_PROTOTYPES
  ],
  imports: [
    NgSelectModule,
    SharedModule,
  ],
  exports: [
    NgSelectModule,
    DynamicLibraryExampleComponent,
    ...NGB_EXAMPLES,
    ...FHI_EXAMPLES,
    ...FHI_PROTOTYPES
  ]
})
export class DynamicLibraryExamplesModule { }
