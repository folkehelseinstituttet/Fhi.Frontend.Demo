import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';
import { LibraryModule } from '../shared/library/library.module';
import { DynamicLibraryExamplesModule } from '../shared/dynamic-library-examples/dynamic-library-examples.module';

import { DeveloperRoutingModule } from './developer-routing.module';

import { FhiFrontendAngularComponentsModule } from '@folkehelseinstituttet/fhi-frontend-angular-components';

@NgModule({
  declarations: DeveloperRoutingModule.components,
  imports: [

    FhiFrontendAngularComponentsModule,

    SharedModule,
    LibraryModule,
    DynamicLibraryExamplesModule,
    DeveloperRoutingModule
  ]
})
export class DeveloperModule { }
