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
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  declarations: [
    SafePipe,
    SpinnerComponent
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
