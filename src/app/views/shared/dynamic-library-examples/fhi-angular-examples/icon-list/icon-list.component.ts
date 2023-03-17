import { Component, ElementRef, Input, ViewChild } from '@angular/core';

import { Clipboard } from '@angular/cdk/clipboard';
import { includedIcons } from 'src/MOCK_DB_DATA/library-items/icons/icon-set.GENERATED';

@Component({
  selector: 'app-icon-list',
  templateUrl: './icon-list.component.html'
})
export class IconListComponent {
  @ViewChild('iconFilterInput') iconFilterInput: ElementRef;
  
  includedIcons: any = includedIcons;
  fhiIconIndex = includedIcons.indexOf('fhi-logo');
  filteredIcons: any = [...includedIcons];
  iconFilter: string = '';
  iconSizeSelected: string = 'md';

  constructor(private clipboard: Clipboard) {}

  ngOnInit() {
    if (this.fhiIconIndex > -1) {
      includedIcons.splice(this.fhiIconIndex, 1);
      this.filteredIcons = [...includedIcons];
    }
  }

  onFilterIcons(event: KeyboardEvent) {
    this.filteredIcons = includedIcons.filter(x => x.includes(this.iconFilter));

    if (this.filteredIcons.length < 1) {
      
    }

    if (event.key === 'Escape') {
      this.onResetFilter();
    }
  }

  onCopyByFocus(event: KeyboardEvent, iconToCopy: string) {
    if (event.key === 'Enter') {
      this.onCopyIconClass(iconToCopy);
    }
  }

  onCopyIconClass(iconToCopy: string) {
    const iconTag = `<i class="icon-${iconToCopy} icon-${this.iconSizeSelected}"></i>`;
    this.clipboard.copy(iconTag);
  }

  onResetFilter() {
    this.iconFilter = '';
    this.filteredIcons = [...includedIcons];
    this.iconFilterInput.nativeElement.focus();
  }

  onChangeSize(iconSize: string) {
    this.iconSizeSelected = iconSize;
  }
}
