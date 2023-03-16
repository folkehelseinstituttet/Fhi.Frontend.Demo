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
  iconSizeSelected: string = 'md';

  constructor(private clipboard: Clipboard) {}

  onFilterIcons(event: KeyboardEvent) {
    this.filteredIcons = includedIcons.filter(x => x.includes(this.iconFilter));

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
    console.log(iconToCopy, this.iconSizeSelected);
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
