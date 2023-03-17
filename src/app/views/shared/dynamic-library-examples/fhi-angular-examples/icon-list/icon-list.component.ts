import { Component } from '@angular/core';

import { includedIcons as Icons } from 'src/MOCK_DB_DATA/library-items/icons/icon-set.GENERATED';

@Component({
  selector: 'app-icon-list',
  templateUrl: './icon-list.component.html'
})
export class IconListComponent {
  icons = [...Icons];
  iconSizeSelected = 'md';
  iconSizes = [
    { size: 'sm', px: '16'},
    { size: 'md', px: '24'},
    { size: 'lg', px: '32'},
    { size: 'xl', px: '40'}
  ];
  searchInput!: string;

  changeSize(iconSize: string) {
    this.iconSizeSelected = iconSize;
  }

}
