import { NgModule } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';

import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

import { SharedModule } from 'src/app/shared/shared.module';

import { DynamicLibraryExampleComponent } from './dynamic-library-example.component';

import { AccordionsComponent } from './example-components/accordions/accordions.component';
import { AlertsComponent } from './example-components/alerts/alerts.component';
import { AlertClosableComponent } from './example-components/alerts/alert-closable/alert-closable.component';
import { HighchartsComponent } from './example-components/highcharts/highcharts.component';
import { TimeSelectorsComponent } from './example-components/time-selectors/time-selectors.component';

import { IconListComponent } from './fhi-angular-examples/icon-list/icon-list.component';
import { LayoutExpandableFistColExampleComponent } from './fhi-angular-examples/layout-expandable-fist-col-example/layout-expandable-first-col-example.component';
import { ModalExampleComponent } from './ng-bootstrap-examples/modal-example/modal-example.component';
import { PaginationExampleComponent } from './ng-bootstrap-examples/pagination-example/pagination-example.component';
import { TableExamplesComponent } from './fhi-angular-examples/table-examples/table-examples.component';
import { TabsExampleComponent } from './ng-bootstrap-examples/tabs-example/tabs-example.component';
import { ToastExampleComponent } from './ng-bootstrap-examples/toast-example/toast-example.component';
import { TooltipExampleComponent } from './ng-bootstrap-examples/tooltip-and-popover-example/tooltip-and-popover-example.component';

import { AdvancedSelectExampleComponent } from './fhi-angular-examples/advanced-select-example/advanced-select-example.component';
import { FormElementExamplesComponent } from './fhi-angular-examples/form-element-examples/form-element-examples.component';
import { GlobalHeadersExampleComponent } from './fhi-angular-examples/global-headers/global-headers.component';
import { ProgressBarExampleComponent } from './fhi-angular-examples/progress-bar-example/progress-bar-example.component';
import { SearchExampleComponent } from './fhi-angular-examples/search-example/search-example.component';
import { TagExampleComponent } from './fhi-angular-examples/tag-example/tag-example.component';

import { TreeViewNavigationExampleComponent } from './fhi-angular-examples/tree-view-navigation-example/tree-view-naviagation-example.component';
import { TreeViewSelectionExampleComponent } from './fhi-angular-examples/tree-view-selection-examples/tree-view-selection-examples.component';

import { PrototypeFormsComponent } from './fhi-prototypes/forms/forms.component';
import { PrototypePageheaderExampleComponent } from './fhi-prototypes/pageheader/pageheader.component';
import { TableWithExpandableContentComponent } from './fhi-prototypes/table-with-expandable-content/table-with-expandable-content.component';
import { AngularTreeViewBuilderExampleComponent } from './fhi-prototypes/angular-tree-view-builder-example/angular-tree-view-builder-example.component';

const EXAMPLE_COMPONENTS = [
  AccordionsComponent,
  AlertsComponent,
  AlertClosableComponent,
  HighchartsComponent,
  TimeSelectorsComponent,
];

const NGB_EXAMPLES = [
  LayoutExpandableFistColExampleComponent,
  ModalExampleComponent,
  PaginationExampleComponent,
  TabsExampleComponent,
  ToastExampleComponent,
  TooltipExampleComponent
];

const FHI_EXAMPLES = [
  AdvancedSelectExampleComponent,
  IconListComponent,
  FormElementExamplesComponent,
  GlobalHeadersExampleComponent,
  ProgressBarExampleComponent,
  SearchExampleComponent,
  TableExamplesComponent,
  TreeViewNavigationExampleComponent,
  TreeViewSelectionExampleComponent,
  TagExampleComponent
];

const FHI_PROTOTYPES = [
  AngularTreeViewBuilderExampleComponent,
  PrototypeFormsComponent,
  PrototypePageheaderExampleComponent,
  TableWithExpandableContentComponent
];

@NgModule({
  declarations: [
    DynamicLibraryExampleComponent,
    ...EXAMPLE_COMPONENTS,

    // TODO: remove
    ...NGB_EXAMPLES,
    ...FHI_EXAMPLES,
    ...FHI_PROTOTYPES
  ],
  imports: [
    NgbTooltipModule,
    NgSelectModule,
    SharedModule,
  ],
  exports: [
    NgSelectModule,
    DynamicLibraryExampleComponent,
    ...EXAMPLE_COMPONENTS,

    // TODO: remove
    ...NGB_EXAMPLES,
    ...FHI_EXAMPLES,
    ...FHI_PROTOTYPES
  ]
})
export class DynamicLibraryExamplesModule { }
