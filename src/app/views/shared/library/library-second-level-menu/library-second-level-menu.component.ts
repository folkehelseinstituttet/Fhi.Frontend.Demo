import { Component, Input } from '@angular/core';

import { MenuItem } from 'src/app/models/menu-item.model';
import { LibraryItemFilter } from '../../models/library-item-filter.model';
import { SharedConstants as CONST } from '../../shared.constants';

@Component({
  selector: 'app-library-second-level-menu',
  templateUrl: './library-second-level-menu.component.html',
})
export class LibrarySecondLevelMenuComponent {
  @Input() menuItems: MenuItem[];

  activeNavTab = 0;
  lang_NO: string = CONST.languageLocaleId_NO;
  lang_EN: string = CONST.languageLocaleId_EN;
  leftMenuMobileTriggerOpen = false;
  libraryItemFilter: LibraryItemFilter = { name: '' };

  ngOnInit() {
    console.log(this.menuItems);
  }
}
