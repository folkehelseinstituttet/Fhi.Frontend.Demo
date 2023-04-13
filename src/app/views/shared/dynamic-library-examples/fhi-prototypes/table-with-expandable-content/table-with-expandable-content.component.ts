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

    .fhi-tablerow-expanded__additional-content {
      padding-left: 60px;
    }

    .fhi-btn-expand-table-container {
      min-width: 44px;
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

    .fhi-btn-expand-table:focus-visible {
      box-shadow: 0 0 0 2px #0067c4 inset !important;
    }

    .fhi-btn-expand-table [class*="icon-"] {
      background-position: center center;
    }
  `],
  providers: [TableWithExpandableContentDataService],
})
export class TableWithExpandableContentComponent {

  tableData: any = [];

  tableHeaderData: any = [];
  tableBodyData: any = [];

  constructor(private tableDataService: TableWithExpandableContentDataService) { }

  ngOnInit() {
    this.tableData = this.tableDataService.tableData();

    this.tableBodyData = this.tableData;
    this.tableHeaderData = [{
      heading: 'Varselkode',
      width: 100
    }, {
      heading: 'Første hendelse',
      noWrap: true
    }, {
      heading: 'Siste hendelse',
      noWrap: true
    }, {
      heading: 'Antall hendelser'
    }, {
      heading: 'Varsel'
    }, {
      heading: 'Konsekvens'
    }];
  }

}
