import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { LibraryAngularRoutingModule } from './library-angular-routing.module';

import { AngularComponentDirective } from './directives/angular-component.directive';

import { LibraryExampleListDynamicComponent } from './library-example-list-dynamic/library-example-list-dynamic.component';
import { LibraryExampleDynamicDetailComponent } from './library-example-detail-dynamic/library-example-detail-dynamic.component';
import { LibraryExampleDetailNavComponent } from './library-example-detail-nav/library-example-detail-nav.component';

@NgModule({
  declarations: [
    AngularComponentDirective,
    LibraryAngularRoutingModule.components,
    LibraryExampleListDynamicComponent,
    LibraryExampleDynamicDetailComponent,
    LibraryExampleDetailNavComponent
  ],
  imports: [
    SharedModule,
    LibraryAngularRoutingModule
  ]
})
export class LibraryAngularModule { }
