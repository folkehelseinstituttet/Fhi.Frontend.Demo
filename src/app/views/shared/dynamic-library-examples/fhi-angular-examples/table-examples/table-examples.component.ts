import { Component, Input } from '@angular/core';
import { TableExamplesDataService } from './table-examples-data.service';

@Component({
  selector: 'app-table-examples',
  templateUrl: './table-examples.component.html',
  providers: [TableExamplesDataService]
})
export class TableExamplesComponent {
  @Input() itemId!: string;
  @Input() itemIds!: any;
  
  table1: any = [];
  tableEditable: any = [];
  fhiAngularTable: any = {};
  sortDirection: string = 'ascending';
  currentlySortedColumn: string = '';
  previousSortedColumn: string = '';

  constructor(private tableDataService: TableExamplesDataService) { }

  ngOnInit() {
    this.table1 = this.tableDataService.table1();
    this.tableEditable = this.tableDataService.tableEditable();
    this.fhiAngularTable = this.tableDataService.tableLmr();
  }

  sortTable(column: string) {
    this.previousSortedColumn = this.currentlySortedColumn;
    this.currentlySortedColumn = column;

    if (this.previousSortedColumn === this.currentlySortedColumn) {
      if (this.sortDirection === 'ascending') {
        this.sortDirection = 'descending';
      } else {
        this.sortDirection = 'ascending';
      }
    } else {
      this.sortDirection = 'ascending';
    }

    this.table1.tableContent = this.table1.tableContent.sort((a: any, b: any) => {
      if (this.sortDirection === 'ascending') {
        if (a[column] < b[column]) {
          return -1;
        }
      } else {
        if (b[column] < a[column]) {
          return -1;
        }
      }
    });
  }

  getIconClass(column: string) {
    let iconClass = 'icon-arrows-up-down';

    if (this.currentlySortedColumn === column) {
      if (this.sortDirection === 'descending') {
        iconClass = 'icon-arrow-down';
      } else {
        iconClass = 'icon-arrow-up';
      }
    }

    return iconClass;
  }

  toggleAll(chkbx: any) {
    let isChecked = chkbx.srcElement.checked;
    let tableRows = this.table1.tableContent;

    for (let i = 0; i < tableRows.length; i++) {
      tableRows[i].selected = isChecked;
    }
  }

  updataData(elm: any, evnt: any) {
    console.log(evnt.key);
    if (evnt.key !== "1") {
      elm.failed = false;
      setTimeout(function() {
        elm.updated = true
      }, 1000);
      setTimeout(function() {
        elm.updated = false;
      }, 4000);
    } else {
      elm.failed = true;
      setTimeout(function() {
        elm.failed = false;
      }, 5000);
    }
  }

  deleteRow(identificator: string, i: any) {
    if (window.confirm(`Er du sikker på at du vil slette ${identificator}?`)) {
      this.tableEditable.tableContent.splice(i, 1);
    }
  }

}
