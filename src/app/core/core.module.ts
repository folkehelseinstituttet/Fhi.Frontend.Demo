import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeNb from '@angular/common/locales/nb';
import localeNbExtra from '@angular/common/locales/extra/nb';
registerLocaleData(localeNb, 'nb', localeNbExtra);

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { MockDbService } from './mock-db.service';

import 'what-input';

import { SharedModule } from '../shared/shared.module';
import { MainMenuComponent } from '../core/main-menu/main-menu.component';

@NgModule({
  declarations: [
    MainMenuComponent
  ],
  imports: [
    SharedModule,
    HttpClientModule,

    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      MockDbService, { apiBase: 'api/', delay: 0 }
    )
  ],
  exports: [
    MainMenuComponent
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'nb' }
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Should only be imported in AppModule.');
    }
  }
}
