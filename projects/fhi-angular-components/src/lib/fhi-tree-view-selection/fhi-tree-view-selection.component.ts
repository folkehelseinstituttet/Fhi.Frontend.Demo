import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';

import { FhiTreeViewSelectionItem as Item} from './fhi-tree-view-selection-item.model';

@Component({
  selector: 'fhi-tree-view-selection',
  templateUrl: './fhi-tree-view-selection.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FhiTreeViewSelectionComponent {

  @Input() enableCheckAll = false;
  @Input() singleSelection = false;
  @Input() items: Item[] = [];
  @Input() name: string = '';

  @Output() itemsChange = new EventEmitter<Item[]>();

  ngOnInit() {
    if (this.enableCheckAll) {
      this.singleSelection = false;
    }
  }

  ngOnChanges() {
    this.createIds(this.items, 1);
    this.updateDecendantState(this.items, true);
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
    items.forEach(item => {
      this.toggleChecked(item.id, true, true);
    });
    this.itemsChange.emit(this.items);
  }

  uncheckAll(items: Item[]) {
    items.forEach(item => {
      this.toggleChecked(item.id, true);
    });
    this.itemsChange.emit(this.items);
  }

  allItemsChecked(items: Item[]): boolean {
    return items.every(item => item.isChecked)
  }

  private updateCheckedState(id: number | string, items: Item[], multiToggle: boolean, checkAll: boolean) {
    items.forEach(item => {
      if (item.id === id) {
        if (multiToggle) {
          (checkAll) ? item.isChecked = true : item.isChecked = false;
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
      item.descendantStateConfirmed = false;
    });
  }

  private updateDecendantState(items: Item[], initialState: boolean) {
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
        this.updateDecendantState(item.children, initialState);

      } else if (!item.descendantStateConfirmed) {
        item.descendantStateConfirmed = true; // I.e. has no descendants
        this.updateDecendantState(this.items, initialState);
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
