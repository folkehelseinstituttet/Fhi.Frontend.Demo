import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';

import { FontAwesomeExamplesComponent } from './font-awesome-examples.component';
import { FhiBtnShortcutComponent } from '../../fhi-components/fhi-btn-shortcut/fhi-btn-shortcut.component';

@NgModule({
  declarations: [
    FontAwesomeExamplesComponent,
    FhiBtnShortcutComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    FontAwesomeExamplesComponent,
    FhiBtnShortcutComponent
  ]
})
export class FontAwesomeEksemplerModule { }
