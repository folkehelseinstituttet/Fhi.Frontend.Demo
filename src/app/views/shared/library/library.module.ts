import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';

import { LibraryCopyButtonComponent } from './library-copy-button/library-copy-button.component';
import { LibraryTopLevelMenuComponent } from './library-top-level-menu/library-top-level-menu.component';
import { LibrarySecondLevelMenuComponent } from './library-second-level-menu/library-second-level-menu.component';
import { LibraryItemFullScreenButtonComponent } from './library-item-full-screen-button/library-item-full-screen-button.component';

@NgModule({
  declarations: [
    LibraryCopyButtonComponent,
    LibraryTopLevelMenuComponent,
    LibrarySecondLevelMenuComponent,
    LibraryItemFullScreenButtonComponent
  ],
  imports: [
    SharedModule,
  ],
  exports: [
    LibraryCopyButtonComponent,
    LibraryTopLevelMenuComponent,
    LibrarySecondLevelMenuComponent,
    LibraryItemFullScreenButtonComponent
  ]
})
export class LibraryModule { }
