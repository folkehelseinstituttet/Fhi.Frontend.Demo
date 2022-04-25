import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LibraryNgBootstrapComponent } from './library-ng-bootstrap/library-ng-bootstrap.component';
import { NgBootsrapFhiCustomComponentsComponent } from './library-ng-bootstrap/fhi-custom.component';
import { NgbAccordionComponent } from '../mock-db-data/library-ng-bootstrap/ng-bootstrap/ngb-accordion.component';
import { TableSortableComponent } from '../mock-db-data/library-ng-bootstrap/fhi-custom/table-sortable.component';

@NgModule({
  declarations: [
    AppComponent,
    LibraryNgBootstrapComponent,
    NgbAccordionComponent,
    NgBootsrapFhiCustomComponentsComponent,
    TableSortableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    SharedModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
