import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibraryCopyButtonComponent } from './library-copy-button/library-copy-button.component';
import { LibraryItemComponent } from './library-item/library-item.component';



@NgModule({
  declarations: [
    LibraryCopyButtonComponent,
    LibraryItemComponent
  ],
  imports: [
    CommonModule
  ]
})
export class LibraryModule { }
