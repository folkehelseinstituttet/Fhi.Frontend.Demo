import { Component, ElementRef, Input } from '@angular/core';

import { ToggleExpandableRowService } from '../toggle-expandable-row.service';

@Component({
  selector: '[fhi-table-row-expander]',
  templateUrl: './fhi-table-row-expander.component.html'
})
export class FhiTableRowExpanderComponent {
  @Input() index!: number;
  @Input() row: any = {};

  tableRowIsExpanded = false;

  private get hostElement(): HTMLElement {
    return this._elementRef.nativeElement;
  }

  constructor(
    private _elementRef: ElementRef<HTMLElement>,
    private toggleExpandableRowService: ToggleExpandableRowService
  ) {}

  ngOnInit() {
    this.addClass('fhi-table__row-with-expand-button');
  }

  toggleExpandableRow() {
    this.tableRowIsExpanded = !this.tableRowIsExpanded;
    if (this.tableRowIsExpanded) {
      this.toggleExpandableRowService.open(this.index);
      this.addClass('next-row-is-expanded');
    } else {
      this.toggleExpandableRowService.close(this.index);
      this.removeClass('next-row-is-expanded');
    }
  }

  private addClass(classToAdd: string) {
    this.hostElement.classList.add(classToAdd);
  }

  private removeClass(classToRemove: string) {
    this.hostElement.classList.remove(classToRemove);
  }

}
