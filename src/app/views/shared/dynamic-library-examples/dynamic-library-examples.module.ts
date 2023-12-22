import { NgModule } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';

import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

import { SharedModule } from 'src/app/shared/shared.module';

import { DynamicLibraryExampleComponent } from './dynamic-library-example.component';

import { AccordionsComponent } from './example-components/accordions/accordions.component';
import { AlertsComponent } from './example-components/alerts/alerts.component';
import { AlertClosableComponent } from './example-components/alerts/alert-closable/alert-closable.component';
import { FormControlsComponent } from './example-components/form-controls/form-controls.component';
import { GlobalHeadersComponent } from './example-components/global-headers/global-headers.component';
import { HighchartsComponent } from './example-components/highcharts/highcharts.component';
import { IconListComponent } from './example-components/icon-list/icon-list.component';
import { ModalsComponent } from './example-components/modals/modals.component';
import { NavsComponent } from './example-components/navs/navs.component';
import { PaginationsComponent } from './example-components/paginations/paginations.component';
import { PrototypeFormsComponent } from './fhi-prototypes/forms/forms.component';
import { PrototypePageheaderComponent } from './fhi-prototypes/pageheader/pageheader.component';
import { SearchComponent } from './example-components/search/search.component';
import { TablesComponent } from './example-components/tables/tables.component';
import { TabsExampleComponent } from './example-components/navs/tabs-example/tabs-example.component';
import { TagsComponent } from './example-components/tags/tags.component';
import { TimeSelectorsComponent } from './example-components/time-selectors/time-selectors.component';
import { ToastsComponent } from './example-components/toasts/toasts.component';
import { TreeViewsComponent } from './example-components/tree-views/tree-views.component';

import { TooltipAndPopoverComponent } from './example-components/tooltip-and-popover/tooltip-and-popover.component';

import { LayoutExpandableFirstColExampleComponent } from './fhi-angular-examples/layout-expandable-fist-col-example/layout-expandable-first-col-example.component';
import { ProgressIndicatorsComponent } from './example-components/progress-indicators/progress-indicators.component';

import { TableWithExpandableContentComponent } from './fhi-prototypes/table-with-expandable-content/table-with-expandable-content.component';
import { AngularTreeViewBuilderExampleComponent } from './fhi-prototypes/angular-tree-view-builder-example/angular-tree-view-builder-example.component';

const EXAMPLE_COMPONENTS = [
  AccordionsComponent,
  AlertsComponent,
  AlertClosableComponent,
  GlobalHeadersComponent,
  HighchartsComponent,
  IconListComponent,
  ModalsComponent,
  NavsComponent,
  PaginationsComponent,
  ProgressIndicatorsComponent,
  PrototypeFormsComponent,
  PrototypePageheaderComponent,
  SearchComponent,
  TablesComponent,
  TabsExampleComponent,
  TagsComponent,
  TimeSelectorsComponent,
  ToastsComponent,
  TreeViewsComponent,
];

const NGB_EXAMPLES = [LayoutExpandableFirstColExampleComponent, TooltipAndPopoverComponent];

const FHI_PROTOTYPES = [
  AngularTreeViewBuilderExampleComponent,
  TableWithExpandableContentComponent,
];

@NgModule({
  declarations: [
    DynamicLibraryExampleComponent,
    ...EXAMPLE_COMPONENTS,

    // TODO: remove
    ...NGB_EXAMPLES,
    ...FHI_PROTOTYPES,
  ],
  imports: [NgbTooltipModule, NgSelectModule, SharedModule, FormControlsComponent],
  exports: [
    NgSelectModule,
    DynamicLibraryExampleComponent,
    ...EXAMPLE_COMPONENTS,

    // TODO: remove
    ...NGB_EXAMPLES,
    ...FHI_PROTOTYPES,
  ],
})
export class DynamicLibraryExamplesModule {}
