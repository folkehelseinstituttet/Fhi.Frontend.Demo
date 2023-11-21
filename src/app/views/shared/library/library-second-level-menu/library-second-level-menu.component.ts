import { Component, Input } from '@angular/core';

import { MenuItem } from 'src/app/models/menu-item.model';
import { LibraryItemFilter } from '../../models/library-item-filter.model';
import { LibraryItemConstants } from 'src/MOCK_DB_DATA/library-items/library-item-constants';
import { SharedConstants } from '../../shared.constants';

@Component({
  selector: 'app-library-second-level-menu',
  templateUrl: './library-second-level-menu.component.html',
})
export class LibrarySecondLevelMenuComponent {
  @Input() menuItems: MenuItem[];

  activeNavTab = 0;
  langNO: string = LibraryItemConstants.languageLocaleId_NO;
  langEN: string = SharedConstants.languageLocaleId_EN;
  leftMenuMobileTriggerOpen = false;
  libraryItemFilter: LibraryItemFilter = { name: '' };

  ngOnInit() {
    console.log(this.menuItems);
  }
}
