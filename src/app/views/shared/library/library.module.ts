import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';

import { LibraryCopyButtonComponent } from './library-copy-button/library-copy-button.component';
import { LibraryItemComponent } from './library-item/library-item.component';
import { LibraryTopLevelMenuComponent } from './library-top-level-menu/library-top-level-menu.component';
import { LibrarySecondLevelMenuComponent } from './library-second-level-menu/library-second-level-menu.component';

@NgModule({
  declarations: [
    LibraryCopyButtonComponent,
    LibraryItemComponent,
    LibraryTopLevelMenuComponent,
    LibrarySecondLevelMenuComponent
  ],
  imports: [
    SharedModule,
  ],
  exports: [
    LibraryCopyButtonComponent,
    LibraryItemComponent,
    LibraryTopLevelMenuComponent,
    LibrarySecondLevelMenuComponent
  ]
})
export class LibraryModule { }
