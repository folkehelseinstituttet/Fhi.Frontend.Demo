import { Component, Input } from '@angular/core';

import { LibraryMenuLevel2Item } from '../models/library-menu-level-2-item.model';
import { LibraryMenuLevel2Category } from 'src/app/shared/models/library-menu-level-2-category.model';
import { LibraryExampleFilter } from 'src/app/shared/models/library-example-filter.model';

@Component({
  selector: 'app-library-menu-level-2',
  templateUrl: './library-menu-level-2.component.html'
})
export class LibraryMenuLevel2Component {

  @Input() menuItems: LibraryMenuLevel2Item[];
  @Input() categories: LibraryMenuLevel2Category[];

  activeNavTab = 0;
  libraryExampleFilter: LibraryExampleFilter = { title: '' };

}
