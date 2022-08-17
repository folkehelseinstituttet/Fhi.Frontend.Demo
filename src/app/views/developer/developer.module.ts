import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';
import { LibraryModule } from '../shared/library/library.module';
import { DeveloperRoutingModule } from './developer-routing.module';

@NgModule({
  declarations: DeveloperRoutingModule.components,
  imports: [
    SharedModule,
    LibraryModule,
    DeveloperRoutingModule
  ]
})
export class DeveloperModule { }
