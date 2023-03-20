import { Component, ElementRef, ViewChild } from '@angular/core';

import { IncludedIcons as Icons } from 'src/MOCK_DB_DATA/library-items/icons/icon-set.GENERATED';

@Component({
  selector: 'app-icon-list',
  templateUrl: './icon-list.component.html'
})
export class IconListComponent {
  @ViewChild('iconFilterInput') iconFilterInput: ElementRef;

  icons = [...Icons];
  iconSizeSelected = 'md';
  iconSizes = [
    { size: 'sm', px: '16'},
    { size: 'md', px: '24'},
    { size: 'lg', px: '32'},
    { size: 'xl', px: '40'}
  ];
  searchInput!: string;

  checkIfEscape(whatKey: KeyboardEvent) {
    if (whatKey.key === 'Escape') {
      this.resetFilter();
    }
  }

  changeSize(iconSize: string) {
    this.iconSizeSelected = iconSize;
  }

  resetFilter() {
    this.searchInput = '';
    this.iconFilterInput.nativeElement.focus();
  }

}
