import { NgModule } from '@angular/core';

import { FhiAutosuggestModule } from './fhi-autosuggest/fhi-autosuggest.module';
import { FhiDateAndTimeModule } from './fhi-date-and-time/fhi-date-and-time.module';
import { FhiDatepickerModule } from './fhi-datepicker/fhi-datepicker.module';
import { FhiMultiselectModule } from './fhi-multiselect/fhi-multiselect.module';
import { FhiTableModule } from './fhi-table/fhi-table.module';
import { FhiTreeViewNavigationModule } from './fhi-tree-view-navigation/fhi-tree-view-navigation.module';
import { FhiTreeViewSelectionModule } from './fhi-tree-view-selection/fhi-tree-view-selection.module';
import { FhiWeekSelectorModule } from './fhi-week-selector/fhi-week-selector.module';

import { FhiWeekpickerComponent } from './fhi-time/fhi-weekpicker/fhi-weekpicker.component';

const FHI_ANGULAR_MODULES_AND_COMPONENTS = [
  FhiAutosuggestModule,
  FhiDateAndTimeModule,
  FhiDatepickerModule,
  FhiMultiselectModule,
  FhiTableModule,
  FhiTreeViewNavigationModule,
  FhiTreeViewSelectionModule,
  FhiWeekSelectorModule,
  FhiWeekpickerComponent
];

@NgModule({
  imports: FHI_ANGULAR_MODULES_AND_COMPONENTS,
  exports: FHI_ANGULAR_MODULES_AND_COMPONENTS
})
export class FhiAngularComponentsModule { }
