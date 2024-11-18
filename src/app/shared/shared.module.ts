import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MarkdownModule } from 'ngx-markdown';
import { FhiAngularComponentsModule } from '@folkehelseinstituttet/angular-components';
import { FhiTreeViewNavigationComponent } from '@folkehelseinstituttet/angular-components';
import { FhiAngularHighchartsModule } from '@folkehelseinstituttet/angular-highcharts';

import { SafePipe } from './pipes/safe.pipe';

@NgModule({
  declarations: [SafePipe],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    MarkdownModule.forRoot(),
    FhiAngularComponentsModule,
    FhiTreeViewNavigationComponent,
    FhiAngularHighchartsModule,
  ],
  exports: [
    SafePipe,
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    MarkdownModule,
    FhiAngularComponentsModule,
    FhiTreeViewNavigationComponent,
    FhiAngularHighchartsModule,
  ],
})
export class SharedModule {}
