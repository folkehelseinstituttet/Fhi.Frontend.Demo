import { NgModule } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';

import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

import { SharedModule } from 'src/app/shared/shared.module';

import { DynamicLibraryExampleComponent } from './dynamic-library-example.component';

import { AccordionsComponent } from './example-components/accordions/accordions.component';
import { AlertsComponent } from './example-components/alerts/alerts.component';
import { AlertClosableComponent } from './example-components/alerts/alert-closable/alert-closable.component';
import { FormControlsComponent } from './example-components/form-controls/form-controls.component';
import { HighchartsComponent } from './example-components/highcharts/highcharts.component';
import { IconListComponent } from './example-components/icon-list/icon-list.component';
import { ModalsComponent } from './example-components/modals/modals.component';
import { NavsComponent } from './example-components/navs/navs.component';
import { PaginationsComponent } from './example-components/paginations/paginations.component';
import { SearchComponent } from './example-components/search/search.component';
import { TabsExampleComponent } from './example-components/navs/tabs-example/tabs-example.component';
import { TimeSelectorsComponent } from './example-components/time-selectors/time-selectors.component';

import { ToastExampleComponent } from './ng-bootstrap-examples/toast-example/toast-example.component';
import { TooltipExampleComponent } from './ng-bootstrap-examples/tooltip-and-popover-example/tooltip-and-popover-example.component';

import { GlobalHeadersExampleComponent } from './fhi-angular-examples/global-headers/global-headers.component';
import { LayoutExpandableFistColExampleComponent } from './fhi-angular-examples/layout-expandable-fist-col-example/layout-expandable-first-col-example.component';
import { ProgressBarExampleComponent } from './example-components/progress-indicators/progress-indicators.component';
import { TableExamplesComponent } from './fhi-angular-examples/table-examples/table-examples.component';
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
  IconListComponent,
  ModalsComponent,
  NavsComponent,
  PaginationsComponent,
  SearchComponent,
  TabsExampleComponent,
  TimeSelectorsComponent,
];

const NGB_EXAMPLES = [
  LayoutExpandableFistColExampleComponent,
  ToastExampleComponent,
  TooltipExampleComponent,
];

const FHI_EXAMPLES = [
  GlobalHeadersExampleComponent,
  ProgressBarExampleComponent,
  TableExamplesComponent,
  TreeViewNavigationExampleComponent,
  TreeViewSelectionExampleComponent,
  TagExampleComponent,
];

const FHI_PROTOTYPES = [
  AngularTreeViewBuilderExampleComponent,
  PrototypeFormsComponent,
  PrototypePageheaderExampleComponent,
  TableWithExpandableContentComponent,
];

@NgModule({
  declarations: [
    DynamicLibraryExampleComponent,
    ...EXAMPLE_COMPONENTS,

    // TODO: remove
    ...NGB_EXAMPLES,
    ...FHI_EXAMPLES,
    ...FHI_PROTOTYPES,
  ],
  imports: [NgbTooltipModule, NgSelectModule, SharedModule, FormControlsComponent],
  exports: [
    NgSelectModule,
    DynamicLibraryExampleComponent,
    ...EXAMPLE_COMPONENTS,

    // TODO: remove
    ...NGB_EXAMPLES,
    ...FHI_EXAMPLES,
    ...FHI_PROTOTYPES,
  ],
})
export class DynamicLibraryExamplesModule {}
