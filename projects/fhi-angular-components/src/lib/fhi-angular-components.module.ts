import { NgModule } from '@angular/core';

import { FhiMultiselectModule } from './fhi-multiselect/fhi-multiselect.module';
import { FhiAutosuggestModule } from './fhi-autosuggest/fhi-autosuggest.module';
import { FhiTreeviewNavigationModule } from './fhi-treeview-navigation/fhi-treeview-navigation.module';


const FHI_ANGULAR_MODULES = [
  FhiAutosuggestModule,
  FhiMultiselectModule,
  FhiTreeviewNavigationModule
];

@NgModule({
  imports: FHI_ANGULAR_MODULES,
  exports: FHI_ANGULAR_MODULES
})
export class FhiAngularComponentsModule { }
