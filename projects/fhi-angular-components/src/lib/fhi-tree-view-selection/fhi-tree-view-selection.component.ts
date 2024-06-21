import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FhiTreeViewSelectionItem as Item } from './fhi-tree-view-selection-item.model';
import { FhiTreeViewSelectionItemState } from './fhi-tree-view-selection-item-state.model';

@Component({
  selector: 'fhi-tree-view-selection',
  standalone: true,
  templateUrl: './fhi-tree-view-selection.component.html',
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FhiTreeViewSelectionComponent implements OnInit, OnChanges {
  @Input() enableCheckAll = false;
  @Input() singleSelection = false;
  @Input() items: Item[];
  @Input() name: string;

  @Output() itemsChange = new EventEmitter<Item[]>();

  searchInput = '';
  uniqueFilterId: string;
  filteredItems: Item[];

  constructor() {
    this.uniqueFilterId = this.generateUniqueFilterId();
  }

  ngOnInit() {
    if (this.enableCheckAll) {
      this.singleSelection = false;
    }
    this.filteredItems = [...this.items];
  }

  ngOnChanges() {
    if (this.items !== undefined) {
      this.createIds(this.items, 1);
      this.updateDecendantState(this.items, true);
    }
  }

  toggleExpanded(item: Item) {
    item.isExpanded = !item.isExpanded;
  }

  toggleChecked(id: number | string, multiToggle = false, checkAll = false) {
    this.updateCheckedState(id, this.items, multiToggle, checkAll);
    this.updateDecendantState(this.items, false);
    if (!multiToggle) {
      this.itemsChange.emit(this.items);
    }
  }

  checkAll(items: Item[]) {
    items.forEach((item) => {
      this.toggleChecked(item.id, true, true);
    });
    this.itemsChange.emit(this.items);
  }

  uncheckAll(items: Item[]) {
    items.forEach((item) => {
      this.toggleChecked(item.id, true);
    });
    this.itemsChange.emit(this.items);
  }

  allItemsChecked(items: Item[]): boolean {
    return items.every((item) => item.isChecked);
  }

  // filterTree() {
  //   if (this.searchInput !== '' && this.searchInput.length >= 2) {
  //     this.filteredItems = [...this.items].filter((item) =>
  //       item.name.toLowerCase().includes(this.searchInput.toLowerCase()),
  //     );
  //   } else {
  //     this.filteredItems = [...this.items];
  //   }
  // }

  filterTree() {
    if (this.searchInput.length >= 2) {
      this.filteredItems = this.filterDataIteratively(this.items, this.searchInput);
    } else {
      this.filteredItems = [...this.items];
    }
  }

  private filterDataIteratively(data, query) {
    // console.log('Starting filtering with query:', query);

    const stack = [...data];
    const result = [];

    while (stack.length > 0) {
      const currentItem = stack.pop();

      // console.log('Current item:', currentItem);

      let matches = false;
      for (const key in currentItem) {
        if (
          typeof currentItem[key] === 'string' &&
          currentItem[key].toLowerCase().includes(query.toLowerCase())
        ) {
          matches = true;
          break;
        }
      }

      // console.log('Current item matches:', matches);

      if (matches) {
        result.push(currentItem);
      } else if (currentItem.children) {
        const filteredChildren = this.filterDataIteratively(currentItem.children, query);
        if (filteredChildren.length > 0) {
          result.push({ ...currentItem, children: filteredChildren });
        }
      }
    }

    console.log('Filtering complete. Result:', result);
    return result.reverse();
  }

  private generateUniqueFilterId(): string {
    return 'search-filter-' + Math.random().toString(36).substring(2, 11);
  }

  private updateCheckedState(
    id: number | string,
    items: Item[],
    multiToggle: boolean,
    checkAll: boolean,
  ) {
    items.forEach((item) => {
      if (item.id === id) {
        if (multiToggle) {
          checkAll ? (item.isChecked = true) : (item.isChecked = false);
        } else if (!this.singleSelection) {
          item.isChecked = !item.isChecked;
        } else if (this.singleSelection) {
          item.isChecked = true;
        }
      }
      if (this.singleSelection && item.id !== id) {
        item.isChecked = null;
      }
      if (item.children && item.children.length > 0) {
        this.updateCheckedState(id, item.children, multiToggle, checkAll);
      }
    });
  }

  private updateDecendantState(
    items: Item[],
    expandCheckedItems: boolean,
  ): FhiTreeViewSelectionItemState {
    const itemsState: FhiTreeViewSelectionItemState = {
      hasExpandedDescendant: false,
      hasCheckedDescendant: false,
    };
    if (Array.isArray(items) && items.length > 0) {
      items.forEach((item) => {
        item.isChecked = !!item.isChecked;
        item.isExpanded = !!item.isExpanded;
        item.hasCheckedDescendant = !!item.hasCheckedDescendant;
        let childrenState: FhiTreeViewSelectionItemState = {
          hasExpandedDescendant: false,
          hasCheckedDescendant: false,
        };
        if (item.children && item.children.length > 0) {
          childrenState = this.updateDecendantState(item.children, expandCheckedItems);
        }

        // Compute  CHECKED states
        // Update  hasCheckedDescendant for this item and the overall hasCheckedDescendant for all items in this loop that will be returned to caller
        if (item.isChecked) {
          itemsState.hasCheckedDescendant = true;
        }
        if (childrenState.hasCheckedDescendant) {
          itemsState.hasCheckedDescendant = true;
          item.hasCheckedDescendant = true;
        } else {
          item.hasCheckedDescendant = false;
        }

        // Compute  EXPANDED states
        // Update this items expanded and the overall hasExpandedDecendant for all items in this loop
        if (expandCheckedItems && item.isChecked) {
          itemsState.hasExpandedDescendant = true;
        }
        itemsState.hasExpandedDescendant =
          itemsState.hasExpandedDescendant || childrenState.hasExpandedDescendant;
        item.isExpanded = item.isExpanded || childrenState.hasExpandedDescendant;
      });
    }
    return itemsState;
  }

  private createIds(items: Item[], id: number) {
    items.forEach((item) => {
      if (item.id === undefined) {
        item.id = id++;
      }
      if (item.children && item.children.length > 0) {
        this.createIds(item.children, (id - 1) * 10 + 1);
      }
    });
  }
}
