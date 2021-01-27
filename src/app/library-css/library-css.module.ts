import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { LibraryCssRoutingModule } from './library-css-routing.module';

@NgModule({
  declarations: [LibraryCssRoutingModule.components],
  imports: [
    SharedModule,
    LibraryCssRoutingModule
  ],
  exports: [
    SharedModule
  ]
})
export class LibraryCssModule { }
