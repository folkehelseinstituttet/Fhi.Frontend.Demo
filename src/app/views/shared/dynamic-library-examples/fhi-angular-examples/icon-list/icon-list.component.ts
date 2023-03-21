import { Component } from '@angular/core';

import { Clipboard } from '@angular/cdk/clipboard';

import { IncludedIcons as Icons } from 'src/MOCK_DB_DATA/library-items/icons/icon-set.GENERATED';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-icon-list',
  templateUrl: './icon-list.component.html'
})
export class IconListComponent {

  copyIsSuccess = false;
  tooltipText!: string;

  icons = [...Icons];
  iconSizeSelected = 'md';
  iconSizes = [
    { size: 'sm', px: '16'},
    { size: 'md', px: '24'},
    { size: 'lg', px: '32'},
    { size: 'xl', px: '40'}
  ];
  searchInput!: string;

  fhiIconIndex = this.icons.indexOf('fhi-logo');
  
  constructor(private clipboard: Clipboard) {}

  ngOnInit() {
    if (this.fhiIconIndex > -1) {
      this.icons.splice(this.fhiIconIndex, 1);
    }
  }

  checkIfEscapeFilter(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.searchInput = '';
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
