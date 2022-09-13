import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';
import { LibraryModule } from '../shared/library/library.module';
import { DynamicLibraryExamplesModule } from '../shared/dynamic-library-examples/dynamic-library-examples.module';
import { DesignerRoutingModule } from './designer-routing.module';


@NgModule({
  declarations: DesignerRoutingModule.components,
  imports: [
    SharedModule,
    LibraryModule,
    DynamicLibraryExamplesModule,
    DesignerRoutingModule
  ]
})
export class DesignerModule { }
