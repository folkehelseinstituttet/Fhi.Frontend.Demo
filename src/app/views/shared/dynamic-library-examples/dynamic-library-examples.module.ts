import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';

import { DynamicLibraryExampleComponent } from './dynamic-library-example/dynamic-library-example.component';


@NgModule({
  declarations: [
    DynamicLibraryExampleComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    DynamicLibraryExampleComponent
  ]
})
export class DynamicLibraryExamplesModule { }
