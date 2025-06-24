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

enum SelectionButtonText {
  SELECT_ALL = 'Velg alle',
  REMOVE_ALL = 'Fjern alle',
  SELECT = 'Velg',
  REMOVE = 'Fjern',
  LEVEL_SUFFIX = 'på dette nivået',
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
      this.updateDecendantState(this.items, true);
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

  toggleChecked(id: string, multiToggle = false, checkAll = false) {
    // Special fast path for bulk operations
    if (multiToggle) {
      this.batchUpdateCheckedState(checkAll);
      this.updateDecendantState(this.items, false);
      this.itemsChange.emit(this.items as FhiTreeViewSelectionItem[]);
      return;
    }

    // Regular single item toggle
    this.updateCheckedState(id, this.items, false, checkAll);
    this.updateDecendantState(this.items, false);
    this.itemsChange.emit(this.items as FhiTreeViewSelectionItem[]);
  }

  checkAll(items: Item[]) {
    this.batchUpdateCurrentLevel(true, items);
    this.updateDecendantState(this.items, false);
    this.itemsChange.emit(this.items as FhiTreeViewSelectionItem[]);
  }

  checkAllRecursive(items: Item[]) {
    this.batchUpdateCheckedState(true, items);
    this.updateDecendantState(items, false);
    this.itemsChange.emit(this.items as FhiTreeViewSelectionItem[]);
  }

  uncheckAll(items: Item[]) {
    this.batchUpdateCurrentLevel(false, items);
    this.updateDecendantState(this.items, false);
    this.itemsChange.emit(this.items as FhiTreeViewSelectionItem[]);
  }

  uncheckAllRecursive(items: Item[]) {
    this.batchUpdateCheckedState(false, items);
    this.updateDecendantState(items, false);
    this.itemsChange.emit(this.items as FhiTreeViewSelectionItem[]);
  }

  allItemsChecked(items: Item[]): boolean {
    return items.every((item) => item.isChecked);
  }

  handleLevelSelection(items: Item[]): void {
    if (this.allItemsChecked(items)) {
      this.uncheckAll(items);
    } else {
      this.checkAll(items);
    }
  }

  handleRecursiveSelection(items: Item[]): void {
    if (this.allItemsChecked(items)) {
      this.uncheckAllRecursive(items);
    } else {
      this.checkAllRecursive(items);
    }
  }

  getButtonText(items: Item[], listID: string | null, topLevel: boolean): string {
    if (topLevel) {
      return this.allItemsChecked(items)
        ? SelectionButtonText.REMOVE_ALL
        : SelectionButtonText.SELECT_ALL;
    }

    const isChecked = this.allItemsChecked(items);
    const levelText = listID ? SelectionButtonText.LEVEL_SUFFIX : '';
    return `${isChecked ? SelectionButtonText.REMOVE : SelectionButtonText.SELECT} alle ${levelText}`.trim();
  }

  private batchUpdateCurrentLevel(checkAll: boolean, items: Item[]) {
    for (const item of items) {
      if (this.itemsMap.has(item.internal.id)) {
        this.itemsMap.get(item.internal.id)!.isChecked = checkAll;
      }
    }
  }

  private batchUpdateCheckedState(checkAll: boolean, items?: Item[]) {
    // Special handling for filtered items - check ALL items in the filtered list including children
    if (this.itemsFiltered?.length > 0 && items === this.itemsFiltered) {
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

  private filterItemsRecursively(items: Item[], searchTerm: string): Item[] {
    return items.reduce((itemsFiltered: Item[], item: Item) => {
      let filteredChildren: Item[];
      const partialMatch = item.name.toLowerCase().includes(searchTerm.toLocaleLowerCase());

      if (item.children?.length > 0) {
        filteredChildren = this.filterItemsRecursively(item.children, searchTerm);
      }

      if (partialMatch) {
        item.name = item.name.replace(
          RegExp(searchTerm, 'gi'),
          '<mark class="fhi-tree-view-checkbox__mark">$&</mark>',
        );
        itemsFiltered.push({ ...item, children: filteredChildren });
      }
      if (!partialMatch && item.children && filteredChildren?.length > 0) {
        itemsFiltered.push({ ...item, children: filteredChildren });
      }
      return itemsFiltered;
    }, []);
  }

  private updateCheckedState(id: string, items: Item[], multiToggle: boolean, checkAll: boolean) {
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
