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
  filteredIcons: any = [...includedIcons];
  iconFilter: string = '';
  iconSizeSelected: string = 'icon-md';

  constructor(private clipboard: Clipboard) {}

  onFilterIcons(event: KeyboardEvent) {
    this.filteredIcons = includedIcons.filter(x => x.includes(this.iconFilter));

    if (event.key === 'Escape') {
      this.onResetFilter();
    }
  }

  onCheckIfEnterKeyIsClicked(event: KeyboardEvent, iconToCopy: string) {
    if (event.key === 'Enter') {
      this.onCopyIconClass(iconToCopy);
    }
  }

  onCopyIconClass(iconToCopy: string) {
    this.clipboard.copy(iconToCopy);
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
