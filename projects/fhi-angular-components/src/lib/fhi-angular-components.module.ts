import { NgModule } from '@angular/core';

import { FhiMultiselectModule } from './fhi-multiselect/fhi-multiselect.module';
import { FhiAutosuggestModule } from './fhi-autosuggest/fhi-autosuggest.module';
import { FhiTreeViewNavigationModule } from './fhi-tree-view-navigation/fhi-tree-view-navigation.module';


const FHI_ANGULAR_MODULES = [
  FhiAutosuggestModule,
  FhiMultiselectModule,
  FhiTreeViewNavigationModule
];

@NgModule({
  imports: FHI_ANGULAR_MODULES,
  exports: FHI_ANGULAR_MODULES
})
export class FhiAngularComponentsModule { }
