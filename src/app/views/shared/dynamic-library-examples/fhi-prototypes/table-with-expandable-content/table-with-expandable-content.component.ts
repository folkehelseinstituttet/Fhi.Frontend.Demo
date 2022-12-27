import { Component } from '@angular/core';
import { TableWithExpandableContentDataService } from './table-with-expandable-content-data.service';

@Component({
  selector: 'app-prototype-table-with-expandable-content',
  templateUrl: './table-with-expandable-content.component.html',
  styles: [`
    .fhi-tablerow-expanded th, 
    .fhi-tablerow-expanded td {
      border-bottom: 0;
    }

    .fhi-btn-expand-table-container {
      padding: 0;
      position: relative;
      width: 44px;
    }

    .fhi-btn-expand-table {
      border: 0;
      border-radius: 0;
      padding: 0;
      position: absolute;
      height: 100%;
      width: 44px;
    }

    .fhi-btn-expand-table:focus {
      outline: none !important;
    }

    .fhi-btn-expand-table:focus-visible {
      box-shadow: 0 0 0 3px #f86559 inset;
    }

    .fhi-btn-expand-table [class*="icon-"] {
      background-position: center center;
    }
  `],
  providers: [TableWithExpandableContentDataService],
})
export class TableWithExpandableContentComponent {

  tableData: any = [];

  constructor(private tableDataService: TableWithExpandableContentDataService) { }

  ngOnInit() {
    this.tableData = this.tableDataService.tableData();
  }

}
