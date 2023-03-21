import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { MarkdownModule } from 'ngx-markdown';
import { FhiAngularComponentsModule } from '@folkehelseinstituttet/angular-components';
import { FhiAngularHighchartsModule } from '@folkehelseinstituttet/angular-highcharts';
import { TreeModule } from '@circlon/angular-tree-component';

import { SafePipe } from './pipes/safe.pipe';

@NgModule({
  declarations: [
    SafePipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    FilterPipeModule,
    MarkdownModule.forRoot(),
    FhiAngularComponentsModule,
    FhiAngularHighchartsModule,
    TreeModule
  ],
  exports: [
    SafePipe,
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    FilterPipeModule,
    MarkdownModule,
    FhiAngularComponentsModule,
    FhiAngularHighchartsModule,
    TreeModule
  ]
})
export class SharedModule { }
