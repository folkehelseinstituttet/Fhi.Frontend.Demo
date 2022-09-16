import { Component, Input } from '@angular/core';

import { MenuItem } from 'src/app/models/menu-item.model';
import { LibraryItemFilter } from '../../models/library-item-filter.model';

@Component({
  selector: 'app-library-second-level-menu',
  templateUrl: './library-second-level-menu.component.html'
})
export class LibrarySecondLevelMenuComponent {

  @Input() menuItems: MenuItem[];

  activeNavTab = 0;
  libraryItemFilter: LibraryItemFilter = { name: '' };

}
