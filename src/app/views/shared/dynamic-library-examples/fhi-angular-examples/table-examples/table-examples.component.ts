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
  
  data: any = [];

  constructor(private tableDataService: TableExamplesDataService) { }

  ngOnInit() {
    this.data = this.tableDataService.getNodes();
  }

}
