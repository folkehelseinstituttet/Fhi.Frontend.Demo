import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';

import { FontAwesomeEksemplerComponent } from './font-awesome-eksempler.component';
import { FhiBtnShortcutComponent } from '../../fhi-komponenter/fhi-btn-shortcut/fhi-btn-shortcut.component';

@NgModule({
  declarations: [
    FontAwesomeEksemplerComponent,
    FhiBtnShortcutComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    FontAwesomeEksemplerComponent,
    FhiBtnShortcutComponent
  ]
})
export class FontAwesomeEksemplerModule { }
