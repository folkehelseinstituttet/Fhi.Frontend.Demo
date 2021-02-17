import { NgModule } from '@angular/core';

import { LibraryAngularRoutingModule } from './library-angular-routing.module';

import { SharedModule } from '../shared/shared.module';
import { NgbEksemplerModule } from './eksempelkomponenter/ngb-eksempler/ngb-eksempler.module';
import { FontAwesomeEksemplerModule } from './eksempelkomponenter/font-awesome-eksempler/font-awesome-eksempler.module';

@NgModule({
  declarations: [LibraryAngularRoutingModule.components],
  imports: [
    LibraryAngularRoutingModule,
    SharedModule,
    NgbEksemplerModule,
    FontAwesomeEksemplerModule
  ],
  exports: [
    SharedModule,
    NgbEksemplerModule,
    FontAwesomeEksemplerModule
  ]
})
export class LibraryAngularModule { }
