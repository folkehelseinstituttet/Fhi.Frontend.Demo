import { Component, ElementRef, Input } from '@angular/core';
import { ToggleExpandableRowService } from '../toggle-expandable-row.service';

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
      // TODO:  constant: 'table-row-expand-button-'
      'aria-labelledby', 'table-row-expand-button-'+this.index
    );
    this.hostElement.setAttribute(
      // TODO:  constant: 'table-row-expandable-'
      'id', 'table-row-expandable-'+this.index
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
