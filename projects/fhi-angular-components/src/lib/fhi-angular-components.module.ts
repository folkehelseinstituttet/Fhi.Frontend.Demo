import { NgModule } from '@angular/core';

import { FhiAutosuggestComponent } from './fhi-autosuggest/fhi-autosuggest.component';
import { FhiMultiselectComponent } from './fhi-multiselect/fhi-multiselect.component';

import { FhiTreeViewNavigationComponent } from './fhi-tree-view-navigation/fhi-tree-view-navigation.component';
import { FhiTreeViewSelectionComponent } from './fhi-tree-view-selection/fhi-tree-view-selection.component';
import { FhiTreeViewRadioComponent } from './fhi-tree-view-selection/fhi-tree-view-radio/fhi-tree-view-radio.component';
import { FhiTreeViewCheckboxComponent } from './fhi-tree-view-selection/fhi-tree-view-checkbox/fhi-tree-view-checkbox.component';

import { FhiModalComponent } from './fhi-modal/fhi-modal.component';
import { FhiPopoverMenuComponent } from './fhi-popover-menu/fhi-popover-menu.component';

const FHI_ANGULAR_MODULES_AND_COMPONENTS = [
  FhiAutosuggestComponent,
  FhiMultiselectComponent,

  FhiTreeViewNavigationComponent,
  FhiTreeViewSelectionComponent,
  FhiTreeViewCheckboxComponent,
  FhiTreeViewRadioComponent,

  FhiModalComponent,
  FhiPopoverMenuComponent,
];

@NgModule({
  imports: FHI_ANGULAR_MODULES_AND_COMPONENTS,
  exports: FHI_ANGULAR_MODULES_AND_COMPONENTS,
})
export class FhiAngularComponentsModule {}
