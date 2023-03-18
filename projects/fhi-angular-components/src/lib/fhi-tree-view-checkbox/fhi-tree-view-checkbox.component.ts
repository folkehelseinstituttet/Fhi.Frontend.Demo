import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';

import { FhiTreeViewCheckboxItem as Item} from './fhi-tree-view-checkbox-item.model';

@Component({
  selector: 'fhi-tree-view-checkbox',
  templateUrl: './fhi-tree-view-checkbox.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FhiTreeViewCheckboxComponent {

  @Input() items: Item[] = [];
  @Output() checkedItemsChange = new EventEmitter<Item[]>();

  ngOnChanges() {
    this.createIds(this.items, 1);
    this.updateDesecendantState(this.items, true);
  }

  toggleExpanded(item: Item) {
    item.isExpanded = !item.isExpanded;
  }

  toggleChecked(id: number | string, multiToggle = false, checkeAll = false) {
    this.updateCheckedState(id, this.items, multiToggle, checkeAll);
    this.updateDesecendantState(this.items, false);
    if (!multiToggle) {
      this.checkedItemsChange.emit(this.items);
    }
  }

  checkeAll(items: Item[]) {
    items.forEach(item => {
      this.toggleChecked(item.id, true, true);
    });
    this.checkedItemsChange.emit(this.items);
  }

  uncheckeAll(items: Item[]) {
    items.forEach(item => {
      this.toggleChecked(item.id, true);
    });
    this.checkedItemsChange.emit(this.items);
  }

  allItemsChecked(items: Item[]): boolean {
    return items.every(item => item.isChecked)
  }

  private updateCheckedState(id: number | string, items: Item[], multiToggle: boolean, checkeAll: boolean) {
    items.forEach(item => {
      if (item.id === id) {
        if (multiToggle) {
          (checkeAll) ? item.isChecked = true : item.isChecked = false;
        } else {
          item.isChecked = !item.isChecked;
        }
      }
      if (item.children && item.children.length > 0) {
        this.updateCheckedState(id, item.children, multiToggle, checkeAll);
      }
      item.descendantStateConfirmed = false;
    });
  }

  private updateDesecendantState(items: Item[], initialState: boolean) {
    items.forEach(item => {
      if (item.children && item.children.length > 0) {
        if (item.children.every(item => item.descendantStateConfirmed)) {
          if (item.children.find(item => item.isChecked)) {
            this.setHasCheckedDescendantAndIsExpanded(true, item, initialState);
          } else {
            this.setHasCheckedDescendantAndIsExpanded(false, item, initialState);
          }
          if (item.children.find(item => item.hasCheckedDescendant)) {
            this.setHasCheckedDescendantAndIsExpanded(true, item, initialState);
          }
          item.descendantStateConfirmed = true;
        }
        this.updateDesecendantState(item.children, initialState);

      } else if (!item.descendantStateConfirmed) {
        item.descendantStateConfirmed = true; // I.e. has no descendants
        this.updateDesecendantState(this.items, initialState);
      }
    });
  }

  private setHasCheckedDescendantAndIsExpanded(value: boolean, item: Item, initialState: boolean) {
    item.hasCheckedDescendant = value;
    if (initialState) {
      item.isExpanded = value;
    }
  }

  private createIds(items: Item[], id: number) {
    items.forEach(item => {
      if (item.id === undefined) {
        item.id = id++;
      }
      if (item.children && item.children.length > 0) {
        this.createIds(item.children, ((id - 1) * 10) + 1);
      }
    });
  }

}
