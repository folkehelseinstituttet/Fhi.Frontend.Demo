import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FhiTreeViewSelectionItem } from './fhi-tree-view-selection-item.model';
import { FhiTreeViewSelectionItemInternal as Item } from './fhi-tree-view-selection-item-internal.model';
import { FhiTreeViewSelectionItemState } from './fhi-tree-view-selection-item-state.model';
import { BehaviorSubject, debounceTime, Observable, of, switchMap } from 'rxjs';
import { cloneDeep } from 'lodash-es';

enum GenericButtonText {
  SELECT_ALL = 'Velg alle',
  REMOVE_ALL = 'Fjern alle',
  SELECT = 'Velg',
  REMOVE = 'Fjern',
  LEVEL_SUFFIX = 'på dette nivået',
}

enum SpecificButtonText {
  SELECT_ALL = 'Velg kun direkte treff',
  REMOVE_ALL = 'Fjern alle direkte treff',
}

interface ItemSearchable extends Item {
  children?: ItemSearchable[];
  internal?: {
    id: string;
    searched: boolean;
  };
}

@Component({
  selector: 'fhi-tree-view-selection',
  templateUrl: './fhi-tree-view-selection.component.html',
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FhiTreeViewSelectionComponent implements OnInit, OnChanges {
  private itemsMap = new Map<string, Item>();

  @Input() enableCheckAll = false;
  @Input() filterLabel!: string;
  @Input() singleSelection = false;
  @Input({ required: true }) items!: FhiTreeViewSelectionItem[];
  @Input() name!: string;
  @Input() enableFilter = false;
  @Input() placeholder = 'Søk';

  @Output() itemsChange = new EventEmitter<FhiTreeViewSelectionItem[]>();

  @ViewChild('checkboxList') checkboxListRef: ElementRef;
  @ViewChild('resultListWrapper') resultListWrapperRef: ElementRef;

  instanceID = crypto.randomUUID();
  itemsFiltered!: Item[];
  itemsFilteredIsLoading = false;
  itemsFilteredIsLoaded = false;
  searchTerm = '';
  $searchTerm = new BehaviorSubject<string>('');
  resultListHeight = 'auto';
  resultListMaxHeight!: string;

  constructor(private changeDetector: ChangeDetectorRef) {}

  ngOnInit() {
    if (this.enableCheckAll) {
      this.singleSelection = false;
    }
    if (this.enableFilter) {
      this.getFilteredItems(this.$searchTerm).subscribe((resultItems) => {
        if (this.itemsFilteredIsLoading) {
          this.itemsFilteredIsLoaded = true;
          this.itemsFilteredIsLoading = false;
          this.itemsFiltered = resultItems;
          this.changeDetector.detectChanges();
        }
        this.resultListHeight = 'auto';
        this.changeDetector.detectChanges();
      });
    }
    this.buildItemsIndex(this.items);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['items'].currentValue !== undefined) {
      this.createIds(this.items);
      this.buildItemsIndex(this.items);
      this.updateDescendantState(this.items, true);
    }
    this.itemsChange.emit(this.items as FhiTreeViewSelectionItem[]);
  }

  onSearchTermChange(searchTerm: string) {
    if (searchTerm.length === 0) {
      this.itemsFilteredIsLoaded = false;
      this.itemsFilteredIsLoading = false;
    } else {
      this.itemsFilteredIsLoading = true;
      this.updateResultListHeightWhileLoading();
    }
    this.$searchTerm.next(searchTerm);
  }

  toggleExpanded(item: Item) {
    item.isExpanded = !item.isExpanded;
  }

  toggleChecked(item: Item, multiToggle = false, checkAll = false) {
    // Special fast path for bulk operations
    if (multiToggle) {
      this.batchUpdateCheckedState(checkAll);
      this.updateDescendantState(this.items, false);
      this.itemsChange.emit(this.items as FhiTreeViewSelectionItem[]);
      return;
    }

    // Regular single item toggle
    const updatedItem = this.updateCheckedState(item.internal?.id, false, checkAll);
    if (updatedItem) {
      item.isChecked = updatedItem.isChecked;
    }
    this.updateDescendantState(this.items, false);
    this.itemsChange.emit(this.items as FhiTreeViewSelectionItem[]);
  }

  handleLevelSelection(items: Item[]): void {
    if (this.allItemsChecked(items)) {
      this.uncheckAll(items);
    } else {
      this.checkAll(items);
    }
  }

  handleRecursiveSelection(items: Item[]): void {
    if (this.allItemsCheckedRecursive(items)) {
      this.uncheckAllRecursive(items);
    } else {
      this.checkAllRecursive(items);
    }
  }

  handleSpecificSelection(items: Item[]): void {
    const filteredItems = this.filterItemsRecursively(cloneDeep(items), this.$searchTerm.value);
    const searchedItems = this.getFilteredItemsTest(filteredItems);
    const allSelected = this.allItemsChecked(searchedItems);
    this.updateItemsCheckedState(searchedItems, !allSelected);
    this.updateDescendantState(this.items, false);
  }

  getGenericButtonText(items: Item[], listID: string | null, topLevel: boolean): string {
    if (topLevel) {
      return this.allItemsCheckedRecursive(items)
        ? GenericButtonText.REMOVE_ALL
        : GenericButtonText.SELECT_ALL;
    }

    const isChecked = this.allItemsChecked(items);
    const levelText = listID ? GenericButtonText.LEVEL_SUFFIX : '';
    return `${isChecked ? GenericButtonText.REMOVE : GenericButtonText.SELECT} alle ${levelText}`.trim();
  }

  getSpecificSelectionButtonText(items: ItemSearchable[]) {
    const searchedItems = this.getFilteredItemsTest(items);
    const allSelected = this.allItemsChecked(searchedItems);
    return allSelected ? SpecificButtonText.REMOVE_ALL : SpecificButtonText.SELECT_ALL;
  }

  private checkAll(items: Item[]) {
    this.batchUpdateCurrentLevel(true, items);
    this.updateDescendantState(this.items, false);
    this.itemsChange.emit(this.items as FhiTreeViewSelectionItem[]);
  }

  private checkAllRecursive(items: Item[]) {
    this.batchUpdateCheckedState(true, items);
    this.updateDescendantState(items, false);
    this.itemsChange.emit(this.items as FhiTreeViewSelectionItem[]);
  }

  private uncheckAll(items: Item[]) {
    this.batchUpdateCurrentLevel(false, items);
    this.updateDescendantState(this.items, false);
    this.itemsChange.emit(this.items as FhiTreeViewSelectionItem[]);
  }

  private uncheckAllRecursive(items: Item[]) {
    this.batchUpdateCheckedState(false, items);
    this.updateDescendantState(items, false);
    this.itemsChange.emit(this.items as FhiTreeViewSelectionItem[]);
  }

  private allItemsChecked(items: Item[]): boolean {
    return items.every((item) => item.isChecked);
  }

  private allItemsCheckedRecursive(items: Item[]): boolean {
    return items.every((item) => {
      if (item.children && item.children.length > 0) {
        return item.isChecked && this.allItemsCheckedRecursive(item.children);
      }

      return item.isChecked;
    });
  }

  private batchUpdateCurrentLevel(checkAll: boolean, items: Item[]) {
    for (const item of items) {
      if (this.itemsMap.has(item.internal.id)) {
        this.itemsMap.get(item.internal.id)!.isChecked = checkAll;
      }
    }
  }

  private updateItemsCheckedState(items: Item[], checkState: boolean): void {
    for (const item of items) {
      const itemId = item.internal.id;
      const mapItem = this.itemsMap.get(itemId);
      if (mapItem) {
        mapItem.isChecked = checkState;
      }
    }

    // If we're in filtered mode, also update the filtered view items
    if (this.$searchTerm.value.trim().length > 0) {
      const itemIds = new Set(items.map((item) => item.internal.id));
      const stack = [...this.itemsFiltered];

      while (stack.length > 0) {
        const currentItem = stack.pop()!;
        if (itemIds.has(currentItem.internal.id)) {
          currentItem.isChecked = checkState;
        }
        if (currentItem.children?.length) {
          stack.push(...currentItem.children);
        }
      }
    }
  }

  private batchUpdateCheckedState(checkAll: boolean, items?: Item[]) {
    // Special handling for filtered items - check ALL items in the filtered list including children
    if (this.$searchTerm.value.trim().length > 0) {
      const stack = [...this.itemsFiltered];
      while (stack.length > 0) {
        const item = stack.pop()!;
        const itemId = item.internal.id;

        // Update both the map and the filtered item
        this.itemsMap.get(itemId)!.isChecked = checkAll;
        item.isChecked = checkAll;

        // Add all children to the stack
        if (item.children?.length) {
          stack.push(...item.children);
        }
      }
      return;
    }

    // Regular tree processing for non-filtered operations
    if (items) {
      const stack = [...items];
      while (stack.length > 0) {
        const item = stack.pop()!;
        const itemId = item.internal.id;
        this.itemsMap.get(itemId)!.isChecked = checkAll;

        if (item.children?.length) {
          stack.push(...item.children);
        }
      }
    } else {
      this.itemsMap.forEach((item) => {
        item.isChecked = checkAll;
      });
    }
  }

  private buildItemsIndex(items: Item[]) {
    this.itemsMap.clear();
    const stack = [...items];

    while (stack.length > 0) {
      const item = stack.pop()!;
      this.itemsMap.set(item.internal.id, item);
      if (item.children?.length) {
        stack.push(...item.children);
      }
    }
  }

  private updateResultListHeightWhileLoading() {
    const heightList = this.checkboxListRef?.nativeElement.offsetHeight;
    const heightWrapper = this.resultListWrapperRef?.nativeElement.offsetHeight;

    if (heightList && !heightWrapper) {
      this.resultListHeight = heightList + 'px';
      this.resultListMaxHeight = heightList > 500 ? heightList + 'px' : '500px';
    } else {
      this.resultListHeight = heightWrapper + 'px';
    }
  }

  private getFilteredItems($searchTerm: Observable<string>): Observable<Item[]> {
    return $searchTerm.pipe(
      debounceTime(400),
      switchMap((searchTerm) => this.getItemsFilteredBySearchTerm(searchTerm)),
    );
  }

  private getItemsFilteredBySearchTerm(searchTerm: string): Observable<Item[]> {
    this.itemsFilteredIsLoaded = false;

    if (searchTerm === '') {
      return of(undefined);
    }
    return of(this.filterItemsRecursively(cloneDeep(this.items), searchTerm));
  }

  private filterItemsRecursively(items: Item[], searchTerm: string): ItemSearchable[] {
    return items.reduce((itemsFiltered: ItemSearchable[], item: Item) => {
      let filteredChildren: ItemSearchable[];
      const partialMatch = item.name.toLowerCase().includes(searchTerm.toLocaleLowerCase());

      if (item.children?.length > 0) {
        filteredChildren = this.filterItemsRecursively(item.children, searchTerm);
      }

      if (partialMatch) {
        item.name = item.name.replace(
          RegExp(searchTerm, 'gi'),
          '<mark class="fhi-tree-view-checkbox__mark">$&</mark>',
        );
        itemsFiltered.push({
          ...item,
          children: filteredChildren,
          internal: { ...item.internal, searched: true },
        });
      }

      if (!partialMatch && item.children && filteredChildren?.length > 0) {
        itemsFiltered.push({
          ...item,
          children: filteredChildren,
          internal: { ...item.internal, searched: false },
        });
      }
      return itemsFiltered;
    }, []);
  }

  private getFilteredItemsTest(items: ItemSearchable[]): ItemSearchable[] {
    const result: ItemSearchable[] = [];

    for (const item of items) {
      // Add this item if it's searched
      if (item.internal?.searched) {
        result.push(item);
      }

      // Recursively process children if they exist
      if (item.children && item.children.length > 0) {
        result.push(...this.getFilteredItemsTest(item.children));
      }
    }

    return result;
  }

  private updateCheckedState(id: string, multiToggle: boolean, checkAll: boolean): Item | void {
    const targetItem = this.itemsMap.get(id);
    if (!targetItem) return;

    if (multiToggle) {
      targetItem.isChecked = checkAll;
    } else if (!this.singleSelection) {
      targetItem.isChecked = !targetItem.isChecked;
    } else {
      // Handle single selection
      targetItem.isChecked = true;

      if (this.singleSelection) {
        // Clear all other selections
        this.itemsMap.forEach((item, itemId) => {
          if (itemId !== id) {
            item.isChecked = null;
          }
        });
      }
    }
    return targetItem;
  }

  private updateDescendantState(
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
          childrenState = this.updateDescendantState(item.children, expandCheckedItems);
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
        // Update this items expanded and the overall hasExpandedDescendant for all items in this loop
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

  private createIds(items: Item[], id?: number): number {
    id = id ? id : 0;

    items.forEach((item) => {
      item.internal = {
        id: this.instanceID + '-' + ++id,
      };
      if (item.children && item.children.length > 0) {
        id = this.createIds(item.children, id);
      }
    });
    return id;
  }
}
