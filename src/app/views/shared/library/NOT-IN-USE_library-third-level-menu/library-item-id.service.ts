import { Injectable } from '@angular/core';

import { LibraryItem } from '../models/library-item.model';

@Injectable({
  providedIn: 'root'
})
export class LibraryItemIdService {

  addItemId(libraryItems: LibraryItem[]): LibraryItem[] {
    const items: LibraryItem[] = [];
    let i = 0;
    libraryItems.forEach(item => {
      item.id = this.createId(item.title);
      items[i] = item;
      i++;
    });
    return items;
  }

  private createId(text: string): string  {
    return text.replace(/\s+/g, '-').toLowerCase();
  }

}
