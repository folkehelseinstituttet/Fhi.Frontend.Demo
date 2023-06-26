import { NgModule } from '@angular/core';

import { FhiMultiselectModule } from './fhi-multiselect/fhi-multiselect.module';
import { FhiAutosuggestModule } from './fhi-autosuggest/fhi-autosuggest.module';
import { FhiTableModule } from './fhi-table/fhi-table.module';
import { FhiTreeViewNavigationModule } from './fhi-tree-view-navigation/fhi-tree-view-navigation.module';
import { FhiTreeViewSelectionModule } from './fhi-tree-view-selection/fhi-tree-view-selection.module';


const FHI_ANGULAR_MODULES = [
  FhiAutosuggestModule,
  FhiMultiselectModule,
  FhiTableModule,
  FhiTreeViewNavigationModule,
  FhiTreeViewSelectionModule
];

@NgModule({
  imports: FHI_ANGULAR_MODULES,
  exports: FHI_ANGULAR_MODULES
})
export class FhiAngularComponentsModule { }
