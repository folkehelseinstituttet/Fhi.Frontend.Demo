import { Component } from '@angular/core';
import { TableWithExpandableContentDataService } from './table-with-expandable-content-data.service';

@Component({
  selector: 'app-prototype-table-with-expandable-content',
  templateUrl: './table-with-expandable-content.component.html',
  providers: [TableWithExpandableContentDataService],
})
export class TableWithExpandableContentComponent {

  tableData: any = [];

  constructor(private tableDataService: TableWithExpandableContentDataService) { }

  ngOnInit() {
    this.tableData = this.tableDataService.tableData();
  }

}
