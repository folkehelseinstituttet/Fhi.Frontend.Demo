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

import { FhiTreeViewSelectionItem as Item } from './fhi-tree-view-selection-item.model';
import { FhiTreeViewSelectionItemState } from './fhi-tree-view-selection-item-state.model';
import { debounceTime, distinctUntilChanged, Observable, of, Subject, switchMap, tap } from 'rxjs';
import { cloneDeep } from 'lodash-es';

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
  @Input() filterLabel!: string;
  @Input() singleSelection = false;
  @Input({ required: true }) items!: Item[];
  @Input() name!: string;
  @Input() enableFilter = false;
  @Input() placeholder = 'Søk';

  @Output() itemsChange = new EventEmitter<Item[]>();

  @ViewChild('checkboxList') checkboxListRef: ElementRef;
  @ViewChild('resultListWrapper') resultListWrapperRef: ElementRef;

  instanceID = crypto.randomUUID();
  itemsCount!: number;
  itemsFilteredCount!: number;
  itemsFiltered!: Item[];
  itemsFilteredIsLoading = false;
  itemsFilteredIsLoaded = false;
  searchTerm = '';
  $searchTerm = new Subject<string>();
  searchTermPrevious!: string;
  resultListHeight = 'auto';
  resultListMaxHeight!: string;

  constructor(private changeDetector: ChangeDetectorRef) {}

  ngOnInit() {
    if (this.enableCheckAll) {
      this.singleSelection = false;
    }
    if (this.enableFilter) {
      this.getFilteredItems(this.$searchTerm).subscribe((resultItems) => {
        // debugger;
        if (this.itemsFilteredIsLoading) {
          this.itemsFilteredIsLoaded = true;
          this.itemsFilteredIsLoading = false;
          this.itemsFiltered = resultItems;
          this.changeDetector.detectChanges();
          // console.log('resultItems', resultItems);
          // console.log('this.itemsCount', this.itemsCount);
          // console.log('this.itemsFilteredCount', this.itemsFilteredCount);
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
    this.itemsChange.emit(this.items);
  }

  onSearchTermChange(searchTerm: string) {
    this.itemsCount = 0;
    this.itemsFilteredCount = 0;
    this.itemsFilteredIsLoaded = false;

    if (searchTerm.length === 0 || searchTerm === this.searchTermPrevious) {
      this.itemsFilteredIsLoading = false;
    } else {
      this.itemsFilteredIsLoading = true;
      this.updateResultListHeighWhileLoading();
    }

    // console.log('searchTerm');
    this.$searchTerm.next(searchTerm);
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

  private updateResultListHeighWhileLoading() {
    const heightList = this.checkboxListRef?.nativeElement.offsetHeight;
    const heightWrapper = this.resultListWrapperRef?.nativeElement.offsetHeight;
    console.log('1a. heightList', heightList);
    console.log('1a. heightWrapper', heightWrapper);

    if (heightList && !heightWrapper) {
      this.resultListHeight = heightList + 'px';
      this.resultListMaxHeight = heightList > 500 ? heightList + 'px' : '500px';
      console.log('1b. this.resultListHeight', this.resultListHeight);
    } else {
      this.resultListHeight = heightWrapper + 'px';
      console.log('1c. this.resultListHeight', this.resultListHeight);
    }
  }

  private getFilteredItems($searchTerm: Observable<string>): Observable<Item[]> {
    return $searchTerm.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      tap((searchTerm) => (this.searchTermPrevious = searchTerm)),
      switchMap((searchTerm) => this.getItemsFilteredBySearchTerm(searchTerm)),
    );
  }

  private getItemsFilteredBySearchTerm(searchTerm: string): Observable<Item[]> {
    // console.log('getItemsFilteredBySearchTerm()->searchTerm', searchTerm);
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
        this.itemsFilteredCount++;
      }
      if (!partialMatch && item.children && filteredChildren?.length > 0) {
        itemsFiltered.push({ ...item, children: filteredChildren });
      }
      this.itemsCount++;

      return itemsFiltered;
    }, []);
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

  private createIds(items: Item[], id?: number) {
    let itemID = id ? id : 0;
    items.forEach((item) => {
      if (item.id === undefined) {
        item.id = this.instanceID + '-' + itemID++;
      } else {
        item.id = this.instanceID + '-' + item.id;
      }
      if (item.children && item.children.length > 0) {
        this.createIds(item.children, itemID * 10);
      }
    });
  }
}
