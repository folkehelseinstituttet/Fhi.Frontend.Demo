import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ClipboardModule } from 'ngx-clipboard';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { MarkdownModule } from 'ngx-markdown';

import { SafePipe } from './pipes/safe.pipe';

import { LibraryMenuLevel1Component } from './library-menu-level-1/library-menu-level-1.component';
import { LibraryMenuLevel2Component } from './library-menu-level-2/library-menu-level-2.component';
import { LibraryItemDetailComponent } from './library-example-detail/library-item-detail.component';
import { LibraryCopyButtonComponent } from './library-copy-button/library-copy-button.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { AngularExampleComponent } from './library-example-detail/angular-example.component';
import { AccordionExampleComponent } from './library-example-detail/ng-bootstrap-examples/accordion-example/accordion-example.component';
import { ToastExampleComponent } from './library-example-detail/ng-bootstrap-examples/toast-example/toast-example.component';
import { TooltipExampleComponent } from './library-example-detail/ng-bootstrap-examples/tooltip-example/tooltip-example.component';

@NgModule({
  declarations: [
    SafePipe,
    LibraryMenuLevel1Component,
    LibraryMenuLevel2Component,
    LibraryItemDetailComponent,
    LibraryCopyButtonComponent,
    SpinnerComponent,
    AngularExampleComponent,
    AccordionExampleComponent,
    ToastExampleComponent,
    TooltipExampleComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    NgbModule,
    ClipboardModule,
    FilterPipeModule,
    MarkdownModule.forRoot()
  ],
  exports: [
    SafePipe,
    LibraryMenuLevel1Component,
    LibraryMenuLevel2Component,
    LibraryItemDetailComponent,
    LibraryCopyButtonComponent,
    SpinnerComponent,
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    NgbModule,
    ClipboardModule,
    FilterPipeModule,
    MarkdownModule
  ]
})
export class SharedModule { }
