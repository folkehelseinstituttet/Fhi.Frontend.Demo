import { Component, Input, OnInit } from '@angular/core';
import { Table, TableEditable } from './table.consts';
import { LibraryItemsShared } from '../../../models/library-item.model';

@Component({
    selector: 'app-tables',
    templateUrl: './tables.component.html',
    standalone: false
})
export class TablesComponent implements OnInit {
  @Input() itemId!: string;
  @Input() items!: LibraryItemsShared;

  table1 = [];
  tableEditable = [];
  sortDirection = 'ascending';
  currentlySortedColumn = '';
  previousSortedColumn = '';

  ngOnInit() {
    this.table1 = Table;
    this.tableEditable = TableEditable;
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

    this.table1 = this.table1.sort((a: string, b: string) => {
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
    let iconClass = 'icon-arrow-down-up';

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
    const isChecked = chkbx.srcElement.checked;
    const tableRows = this.table1;

    for (let i = 0; i < tableRows.length; i++) {
      tableRows[i].selected = isChecked;
    }
  }

  updataData(elm: any, evnt: any) {
    console.log(evnt.key);
    if (evnt.key !== '1') {
      elm.failed = false;
      setTimeout(function () {
        elm.updated = true;
      }, 1000);
      setTimeout(function () {
        elm.updated = false;
      }, 4000);
    } else {
      elm.failed = true;
      setTimeout(function () {
        elm.failed = false;
      }, 5000);
    }
  }

  deleteRow(identificator: string, i: number) {
    if (window.confirm(`Er du sikker på at du vil slette ${identificator}?`)) {
      this.tableEditable.splice(i, 1);
    }
  }
}
