import { Component, Input } from '@angular/core';

import { LibraryItemsShared } from '../../../models/library-item.model';

import { Clipboard } from '@angular/cdk/clipboard';

import { IncludedIcons as Icons } from 'src/MOCK_DB_DATA/library-items/icons/icon-set.GENERATED';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-icon-list',
    templateUrl: './icon-list.component.html',
    standalone: false
})
export class IconListComponent {
  @Input() itemId!: string;
  @Input() items!: LibraryItemsShared;

  copyIsSuccess = false;
  tooltipText!: string;

  icons = [...Icons];
  iconSizeSelected = 'md';
  iconSizes = [
    { size: 'sm', px: '16' },
    { size: 'md', px: '24' },
    { size: 'lg', px: '32' },
    { size: 'xl', px: '40' },
  ];
  filteredIcons = [...Icons];
  searchInput = '';

  fhiIconIndex = this.icons.indexOf('fhi-logo');

  constructor(private clipboard: Clipboard) {}

  ngOnInit() {
    if (this.fhiIconIndex > -1) {
      this.icons.splice(this.fhiIconIndex, 1);
    }
  }

  filterIcons(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.searchInput = '';
    }
    if (this.searchInput !== '') {
      this.filteredIcons = this.icons.filter((s) => s.includes(this.searchInput));
    } else {
      this.filteredIcons = this.icons;
    }
  }

  changeSize(iconSize: string) {
    this.iconSizeSelected = iconSize;
  }

  copyIcon(textToCopy: string) {
    this.tooltipText = textToCopy + ' kopiert!';
    this.copyIsSuccess = true;
    this.clipboard.copy(textToCopy);
  }

  tooltipOpen(tooltip: NgbTooltip) {
    this.tooltipText = 'Kopier';
    this.copyIsSuccess = false;
    tooltip.open();
  }
}
