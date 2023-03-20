import { Component, ElementRef, ViewChild } from '@angular/core';

import { Clipboard } from '@angular/cdk/clipboard';

import { IncludedIcons as Icons } from 'src/MOCK_DB_DATA/library-items/icons/icon-set.GENERATED';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-icon-list',
  templateUrl: './icon-list.component.html'
})
export class IconListComponent {
  @ViewChild('iconFilterInput') iconFilterInput: ElementRef;

  copyIsSuccess = false;
  tooltipText = 'Kopier';

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

  checkIfEscapeFilter(whatKey: KeyboardEvent) {
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
