import { NgModule } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';

import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

import { SharedModule } from 'src/app/shared/shared.module';

import { DynamicLibraryExampleComponent } from './dynamic-library-example.component';

import { AccordionsComponent } from './example-components/accordions/accordions.component';
import { AlertsComponent } from './example-components/alerts/alerts.component';
import { AlertClosableComponent } from './example-components/alerts/alert-closable/alert-closable.component';
import { AngularTreeViewBuilderComponent } from './example-components/angular-tree-view-builder/angular-tree-view-builder.component';
import { FormControlsComponent } from './example-components/form-controls/form-controls.component';
import { GlobalHeadersComponent } from './example-components/global-headers/global-headers.component';
import { HighchartsComponent } from './example-components/highcharts/highcharts.component';
import { IconListComponent } from './example-components/icon-list/icon-list.component';
import { ModalsComponent } from './example-components/modals/modals.component';
import { NavsComponent } from './example-components/navs/navs.component';
import { PaginationsComponent } from './example-components/paginations/paginations.component';
import { PrototypeFormsComponent } from './example-components/forms/forms.component';
import { SearchComponent } from './example-components/search/search.component';
import { TableExpandableContentComponent } from './example-components/table-expandable-content/table-expandable-content.component';
import { TablesComponent } from './example-components/tables/tables.component';
import { TabsExampleComponent } from './example-components/navs/tabs-example/tabs-example.component';
import { TagsComponent } from './example-components/tags/tags.component';
import { TimeSelectorsComponent } from './example-components/time-selectors/time-selectors.component';
import { ToastsComponent } from './example-components/toasts/toasts.component';
import { TreeViewsComponent } from './example-components/tree-views/tree-views.component';

import { TooltipAndPopoverComponent } from './example-components/tooltip-and-popover/tooltip-and-popover.component';

import { LayoutExpandableFirstColExampleComponent } from './fhi-angular-examples/layout-expandable-fist-col-example/layout-expandable-first-col-example.component';
import { ProgressIndicatorsComponent } from './example-components/progress-indicators/progress-indicators.component';

const EXAMPLE_COMPONENTS = [
  AccordionsComponent,
  AlertsComponent,
  AlertClosableComponent,
  AngularTreeViewBuilderComponent,
  GlobalHeadersComponent,
  HighchartsComponent,
  IconListComponent,
  ModalsComponent,
  NavsComponent,
  PaginationsComponent,
  ProgressIndicatorsComponent,
  PrototypeFormsComponent,
  SearchComponent,
  TableExpandableContentComponent,
  TablesComponent,
  TabsExampleComponent,
  TagsComponent,
  TimeSelectorsComponent,
  ToastsComponent,
  TooltipAndPopoverComponent,
  TreeViewsComponent,
];

const NGB_EXAMPLES = [LayoutExpandableFirstColExampleComponent];

@NgModule({
  declarations: [
    DynamicLibraryExampleComponent,
    ...EXAMPLE_COMPONENTS,

    // TODO: remove
    ...NGB_EXAMPLES,
  ],
  imports: [NgbTooltipModule, NgSelectModule, SharedModule, FormControlsComponent],
  exports: [
    NgSelectModule,
    DynamicLibraryExampleComponent,
    ...EXAMPLE_COMPONENTS,

    // TODO: remove
    ...NGB_EXAMPLES,
  ],
})
export class DynamicLibraryExamplesModule {}
