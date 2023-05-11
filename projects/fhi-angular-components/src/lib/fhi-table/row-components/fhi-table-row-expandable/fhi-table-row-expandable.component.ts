import { Component, ElementRef, Input } from '@angular/core';

import { ToggleExpandableRowService } from '../toggle-expandable-row.service';
import { FhiTableConstants } from '../../fhi-table.constants';

@Component({
  selector: '[fhi-table-row-expandable]',
  templateUrl: './fhi-table-row-expandable.component.html'
})
export class FhiTableRowExpandableComponent {
  @Input() colspan!: number;
  @Input() index!: number;

  private get hostElement(): HTMLElement {
    return this._elementRef.nativeElement;
  }

  constructor(
    private _elementRef: ElementRef<HTMLElement>,
    private toggleExpandableRowService: ToggleExpandableRowService
  ) {}

  ngOnInit() {
    this.hostElement.setAttribute(
      'aria-labelledby', FhiTableConstants.rowExpandButton + this.index
    );
    this.hostElement.setAttribute(
      'id', FhiTableConstants.rowExpandable + this.index
    );
    this.addClass('fhi-table__row-expandable');
    this.addClass('d-none');

    this.toggleExpandableRowService.tableRowIsExpanded$
      .subscribe(expanded => {
        if (this.index !== this.toggleExpandableRowService.index) {
          return;
        }
        if (expanded) {
          this.removeClass('d-none');
          this.addClass('d-table-row');
        } else {
          this.removeClass('d-table-row');
          this.addClass('d-none');
        }
      });

    // console.log('this.hostElement', this.hostElement);
  }

  private addClass(classToAdd: string) {
    this.hostElement.classList.add(classToAdd);
  }

  private removeClass(classToRemove: string) {
    this.hostElement.classList.remove(classToRemove);
  }

}
