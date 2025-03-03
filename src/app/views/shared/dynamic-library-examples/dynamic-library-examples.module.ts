import { NgModule } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';

import { NgbAccordionModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

import { SharedModule } from 'src/app/shared/shared.module';

import { DynamicLibraryExampleComponent } from './dynamic-library-example.component';

import { AccordionsComponent } from './example-components/accordions/accordions.component';
import { AlertsComponent } from './example-components/alerts/alerts.component';
import { AlertClosableComponent } from './example-components/alerts/alert-closable/alert-closable.component';
import { ButtonsComponent } from './example-components/buttons/buttons.component';
import { FormControlsComponent } from './example-components/form-controls/form-controls.component';
import { GlobalHeadersComponent } from './example-components/global-headers/global-headers.component';
import { HighchartsComponent } from './example-components/highcharts/highcharts.component';
import { IconListComponent } from './example-components/icon-list/icon-list.component';
import { LayoutTemplatesComponent } from './example-components/layout-templates/layout-templates.component';
import { ModalsComponent } from './example-components/modals/modals.component';
import { NavsComponent } from './example-components/navs/navs.component';
import { PaginationsComponent } from './example-components/paginations/paginations.component';
import { ProgressIndicatorsComponent } from './example-components/progress-indicators/progress-indicators.component';
import { PrototypeFormsComponent } from './example-components/forms/forms.component';
import { SearchComponent } from './example-components/search/search.component';
import { TablesComponent } from './example-components/tables/tables.component';
import { TabsExampleComponent } from './example-components/navs/tabs-example/tabs-example.component';
import { TagsComponent } from './example-components/tags/tags.component';
import { ToastsComponent } from './example-components/toasts/toasts.component';
import { TooltipAndPopoverComponent } from './example-components/tooltip-and-popover/tooltip-and-popover.component';
import { TreeViewsComponent } from './example-components/tree-views/tree-views.component';

const EXAMPLE_COMPONENTS = [
  AccordionsComponent,
  AlertsComponent,
  AlertClosableComponent,
  GlobalHeadersComponent,
  HighchartsComponent,
  IconListComponent,
  LayoutTemplatesComponent,
  ModalsComponent,
  NavsComponent,
  PaginationsComponent,
  ProgressIndicatorsComponent,
  PrototypeFormsComponent,
  SearchComponent,
  TablesComponent,
  TabsExampleComponent,
  TagsComponent,
  ToastsComponent,
  TooltipAndPopoverComponent,
  TreeViewsComponent,
];

const EXAMPLE_COMPONENTS_STANDALONE = [ButtonsComponent, FormControlsComponent];

@NgModule({
  declarations: [DynamicLibraryExampleComponent, ...EXAMPLE_COMPONENTS],
  imports: [
    NgbAccordionModule,
    NgbTooltipModule,
    NgSelectModule,
    SharedModule,
    ...EXAMPLE_COMPONENTS_STANDALONE,
  ],
  exports: [NgSelectModule, DynamicLibraryExampleComponent, ...EXAMPLE_COMPONENTS],
})
export class DynamicLibraryExamplesModule {}
