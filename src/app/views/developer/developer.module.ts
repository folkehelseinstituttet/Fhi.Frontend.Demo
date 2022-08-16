import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';
import { DeveloperRoutingModule } from './developer-routing.module';

@NgModule({
  declarations: DeveloperRoutingModule.components,
  imports: [
    SharedModule,
    DeveloperRoutingModule
  ]
})
export class DeveloperModule { }
