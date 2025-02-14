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
import { debounceTime, Observable, of, Subject, switchMap } from 'rxjs';
import { cloneDeep } from 'lodash-es';

@Component({
    selector: 'fhi-tree-view-selection',
    templateUrl: './fhi-tree-view-selection.component.html',
    encapsulation: ViewEncapsulation.None,
    imports: [CommonModule, FormsModule],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FhiTreeViewSelectionComponent implements OnInit, OnChanges {
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
  $searchTerm = new Subject<string>();
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
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['items'].currentValue !== undefined) {
      this.createIds(this.items);
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
      this.updateResultListHeighWhileLoading();
    }
    this.$searchTerm.next(searchTerm);
  }

  toggleExpanded(item: Item) {
    item.isExpanded = !item.isExpanded;
  }

  toggleChecked(id: string, multiToggle = false, checkAll = false) {
    this.updateCheckedState(id, this.items, multiToggle, checkAll);
    this.updateDecendantState(this.items, false);
    if (!multiToggle) {
      this.itemsChange.emit(this.items as FhiTreeViewSelectionItem[]);
    }
  }

  checkAll(items: Item[]) {
    items.forEach((item) => {
      this.toggleChecked(item.internal.id, true, true);
    });
    this.itemsChange.emit(this.items as FhiTreeViewSelectionItem[]);
  }

  uncheckAll(items: Item[]) {
    items.forEach((item) => {
      this.toggleChecked(item.internal.id, true);
    });
    this.itemsChange.emit(this.items as FhiTreeViewSelectionItem[]);
  }

  allItemsChecked(items: Item[]): boolean {
    return items.every((item) => item.isChecked);
  }

  private updateResultListHeighWhileLoading() {
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
    items.forEach((item) => {
      if (item.internal.id === id) {
        if (multiToggle) {
          checkAll ? (item.isChecked = true) : (item.isChecked = false);
        } else if (!this.singleSelection) {
          item.isChecked = !item.isChecked;
        } else if (this.singleSelection) {
          item.isChecked = true;
        }
      }
      if (this.singleSelection && item.internal.id !== id) {
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
