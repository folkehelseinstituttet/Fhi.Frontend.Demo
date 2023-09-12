import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';
import { LibraryModule } from '../shared/library/library.module';
import { DynamicLibraryExamplesModule } from '../shared/dynamic-library-examples/dynamic-library-examples.module';
import { DeveloperRoutingModule } from './developer-routing.module';
import { LibraryItemComponent } from './library-item/library-item.component';
import { LibraryItemFullSrceenComponent } from './library-item-full-srceen/library-item-full-srceen.component';

@NgModule({
  declarations: [
    DeveloperRoutingModule.components,
    LibraryItemComponent,
    LibraryItemFullSrceenComponent
  ],
  imports: [
    SharedModule,
    LibraryModule,
    DynamicLibraryExamplesModule,
    DeveloperRoutingModule
  ]
})
export class DeveloperModule { }
