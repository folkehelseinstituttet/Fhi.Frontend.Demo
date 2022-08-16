import { Injectable } from '@angular/core';

import { LibraryItem } from 'src/app/shared/models/library-item.model';
import { LibraryMenuLevel2Item } from 'src/app/shared/models/library-menu-level-2-item.model';
import { LibraryMenuLevel2Category } from 'src/app/shared/models/library-menu-level-2-category.model';
import { LibraryMenuLevel2Categories } from 'src/app/_common/constants/library-menu-level-2-categories';

@Injectable({
  providedIn: 'root'
})
export class LibraryMenuService {

  private allCategories: Array<string>;
  private noCategory = LibraryMenuLevel2Categories.ukategorisert;

  getLevel2MenuItems(libraryExamples: LibraryItem[]): Array<LibraryMenuLevel2Item> {
    let i = 0;
    const items: LibraryMenuLevel2Item[] = [];

    libraryExamples.forEach(example => {
      items[i] = this.getKomponentMenuItem(example);
      i = i + 1;
    });
    return items;
  }

  getLevel2MenuItemsByCategory(libraryExamples: LibraryItem[]): Array<LibraryMenuLevel2Category> {
    let i = 0;
    const categories: LibraryMenuLevel2Category[] = [];
    this.allCategories = [];

    libraryExamples.forEach(example => {
      const isNewCategory = this.isNewCategoryAndUpdateCategoryNameList(example.category);
      const catId = this.getCurrentCategoryId(example.category);

      if (isNewCategory) {
        categories[catId] = {
          categoryName: (example.category === undefined) ? this.noCategory : example.category,
          items: []
        };
      }
      categories[catId].items.push(this.getKomponentMenuItem(example));
      i = i + 1;
    });
    return this.moveUndefinedToEndOfList(categories);
  }

  addItemId(libraryExamples: LibraryItem[]): LibraryItem[] {
    const examples: LibraryItem[] = [];
    let i = 0;
    libraryExamples.forEach(example => {
      example.id = this.createId(example.title);
      examples[i] = example;
      i++;
    });
    return examples;
  }

  private createId(text: string): string  {
    return text.replace(/\s+/g, '-').toLowerCase();
  }

  private getKomponentMenuItem(example: LibraryItem): LibraryMenuLevel2Item {
    return {
      id: example.id,
      title: example.title
    };
  }

  private isNewCategoryAndUpdateCategoryNameList(category: string): boolean {
    if (this.allCategories.indexOf(category) === -1) {
      this.allCategories.push(category);
      return true;
    }
    return false;
  }

  private moveUndefinedToEndOfList(categories: Array<LibraryMenuLevel2Category>) {
    const indexOfUndefined = categories.findIndex(category => category.categoryName === this.noCategory);
    if (indexOfUndefined !== -1) {
      categories.push(categories.splice(indexOfUndefined, 1)[0]);
    }
    return categories;
  }

  private getCurrentCategoryId(category: string): number  {
    return this.allCategories.indexOf(category);
  }

}
