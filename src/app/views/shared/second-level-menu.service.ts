import { Injectable } from '@angular/core';

import { MenuItem } from 'src/app/models/menu-item.model';
import { LibraryItem } from './library/models/library-item.model';

@Injectable({
  providedIn: 'root'
})
export class SecondLevelMenuService {

  getSecondLevelMenuItems(libraryItems: LibraryItem[]): MenuItem[] {
    let i = 0;
    const items: MenuItem[] = [];
    libraryItems.forEach(item => {
      items[i] = this.getMenuItem(item);
      i = i + 1;
    });
    return items;
  }

  private getMenuItem(item: LibraryItem): MenuItem {
    return {
      name: item.title,
      link: item.id
    };
  }

}
