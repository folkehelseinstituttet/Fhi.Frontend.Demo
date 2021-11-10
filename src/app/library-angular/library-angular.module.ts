import { NgModule } from '@angular/core';

import { LibraryAngularRoutingModule } from './library-angular-routing.module';

import { SharedModule } from '../shared/shared.module';
import { NgbEksemplerModule } from './example-components/ngb-examples/ngb-examples.module';
import { FontAwesomeExamplesModule } from './example-components/font-awesome-examples/font-awesome-examples.module';

@NgModule({
  declarations: [LibraryAngularRoutingModule.components],
  imports: [
    LibraryAngularRoutingModule,
    SharedModule,
    NgbEksemplerModule,
    FontAwesomeExamplesModule
  ],
  exports: [
    SharedModule,
    NgbEksemplerModule,
    FontAwesomeExamplesModule
  ]
})
export class LibraryAngularModule { }
