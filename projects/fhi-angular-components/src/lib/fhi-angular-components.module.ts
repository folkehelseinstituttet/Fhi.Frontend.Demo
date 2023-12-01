import { NgModule } from '@angular/core';

import { FhiAutosuggestModule } from './fhi-autosuggest/fhi-autosuggest.module';
import { FhiMultiselectModule } from './fhi-multiselect/fhi-multiselect.module';
import { FhiTableModule } from './fhi-table/fhi-table.module';
import { FhiTreeViewNavigationModule } from './fhi-tree-view-navigation/fhi-tree-view-navigation.module';
import { FhiTreeViewSelectionModule } from './fhi-tree-view-selection/fhi-tree-view-selection.module';

import { FhiDatepickerComponent } from './fhi-time/fhi-datepicker/fhi-datepicker.component';
import { FhiDateRangeComponent } from './fhi-time/fhi-date-range/fhi-date-range.component';
import { FhiDateTimeComponent } from './fhi-time/fhi-date-time/fhi-date-time.component';
import { FhiWeekpickerComponent } from './fhi-time/fhi-weekpicker/fhi-weekpicker.component';
import { FhiWeekRangeComponent } from './fhi-time/fhi-week-range/fhi-week-range.component';
import { FhiYearMonthComponent } from './fhi-time/fhi-year-month/fhi-year-month.component';
import { FhiYearMonthRangeComponent } from './fhi-time/fhi-year-month-range/fhi-year-month-range.component';
import { FhiYearsComponent } from './fhi-time/fhi-years/fhi-years.component';
import { FhiYearRangeComponent } from './fhi-time/fhi-year-range/fhi-year-range.component';

const FHI_ANGULAR_MODULES_AND_COMPONENTS = [
  FhiAutosuggestModule,
  FhiMultiselectModule,
  FhiTableModule,
  FhiTreeViewNavigationModule,
  FhiTreeViewSelectionModule,

  FhiDatepickerComponent,
  FhiDateRangeComponent,
  FhiDateTimeComponent,
  FhiWeekpickerComponent,
  FhiWeekRangeComponent,
  FhiYearMonthComponent,
  FhiYearMonthRangeComponent,
  FhiYearsComponent,
  FhiYearRangeComponent,
];

@NgModule({
  imports: FHI_ANGULAR_MODULES_AND_COMPONENTS,
  exports: FHI_ANGULAR_MODULES_AND_COMPONENTS,
})
export class FhiAngularComponentsModule {}
