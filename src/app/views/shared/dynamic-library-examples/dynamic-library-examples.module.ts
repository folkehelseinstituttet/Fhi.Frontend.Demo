import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';

import { DynamicLibraryExampleComponent } from './dynamic-library-example/dynamic-library-example.component';

import { AccordionExampleComponent } from './ng-bootstrap-examples/accordion-example/accordion-example.component';
import { AlertDismissibleExampleComponent } from './ng-bootstrap-examples/alert-dismissible-example/alert-dismissible-example.component';
import { ModalExampleComponent } from './ng-bootstrap-examples/modal-example/modal-example.component';
import { SearchExampleComponent } from './ng-bootstrap-examples/search-example/search-example.component';
import { TagExampleComponent } from './fhi-angular-examples/tag-example/tag-example.component';
import { ToastExampleComponent } from './ng-bootstrap-examples/toast-example/toast-example.component';
import { TooltipExampleComponent } from './ng-bootstrap-examples/tooltip-example/tooltip-example.component';

const NGB_EXAMPLES = [
  AccordionExampleComponent,
  AlertDismissibleExampleComponent,
  ModalExampleComponent,
  SearchExampleComponent,
  TagExampleComponent,
  ToastExampleComponent,
  TooltipExampleComponent
];

const FHI_EXAMPLES = [
];

@NgModule({
  declarations: [
    DynamicLibraryExampleComponent,
    ...NGB_EXAMPLES,
    ...FHI_EXAMPLES
  ],
  imports: [
    SharedModule,
  ],
  exports: [
    DynamicLibraryExampleComponent,
    ...NGB_EXAMPLES,
    ...FHI_EXAMPLES
  ]
})
export class DynamicLibraryExamplesModule { }
