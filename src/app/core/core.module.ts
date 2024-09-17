import { NgModule, Optional, SkipSelf } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeNb from '@angular/common/locales/nb';
import localeNbExtra from '@angular/common/locales/extra/nb';
registerLocaleData(localeNb, 'nb', localeNbExtra);

import { SharedModule } from '../shared/shared.module';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { mockDbInterceptor } from './mock-db.interceptor';

@NgModule({
  declarations: [MainMenuComponent],
  exports: [MainMenuComponent],
  imports: [SharedModule],
  providers: [
    { provide: LOCALE_ID, useValue: 'nb' },
    provideHttpClient(withInterceptors([mockDbInterceptor])),
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Should only be imported in AppModule.');
    }
  }
}
