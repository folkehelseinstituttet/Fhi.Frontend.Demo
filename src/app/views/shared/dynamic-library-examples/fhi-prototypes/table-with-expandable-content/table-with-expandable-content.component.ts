import { Component } from '@angular/core';
import { TableWithExpandableContentDataService } from './table-with-expandable-content-data.service';

@Component({
  selector: 'app-prototype-table-with-expandable-content',
  templateUrl: './table-with-expandable-content.component.html',
  styles: [
    `
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

      .fhi-btn-expand-table [class*='icon-'] {
        background-position: center center;
      }
    `,
  ],
  providers: [TableWithExpandableContentDataService],
})
export class TableWithExpandableContentComponent {
  tableData: any = [];

  demoTableConfig!: any;
  demoTableContent!: any[];

  constructor(private tableDataService: TableWithExpandableContentDataService) {}

  ngOnInit() {
    this.tableData = this.tableDataService.tableData();

    this.demoTableConfig = {
      expandableRows: true,
      noWrapHeadings: true,
      headings: [
        {
          name: 'ID',
          sortable: true,
          width: 20,
        },
        {
          name: 'Country',
        },
        {
          name: 'Area',
        },
        {
          name: 'Population',
        },
      ],
    };

    this.demoTableContent = [
      {
        id: 1,
        name: 'Russia',
        area: 17075200,
        population: 146989754,
        expandableContent: [
          {
            name: 'One',
            content: `What are Observables and what is the subscribe() method?

Observables are a type of data structure that emit values over time. Unlike Promises, which only emit a single value, Observables can emit multiple values. They are the ideal choice for handling real-time data.

They are commonly used in Angular for tasks such as HTTP requests, user input, and reactive data updates. They are essential for ensuring that your application remains fast, efficient, and responsive.
Incorrect Usage of subscribe()

One of the most common mistakes made by Angular developers is misusing the subscribe() method of Observables. This leads to unexpected behavior and performance issues, which can be difficult to debug and fix. It also makes the code hard to read and maintain.

Developers often use the subscribe() method as a way of accessing the data emitted by an Observable and then assigning the result value to another class variable. This method is commonly used for tasks such as HTTP requests and reactive data updates. However, writing extra code can lead to memory leaks.

The subscribe() method is called on an Observable and takes in one or more functions as arguments. These functions are then executed whenever the Observable emits a value.

Here’s what I read every time I open a component:`,
          },
          {
            name: 'Two',
            content: 'Content for two',
          },
          {
            name: 'Three',
            content: 'Content for three',
          },
        ],
      },
      {
        id: 2,
        name: 'France',
        area: 640679,
        population: 64979548,
        expandableContent: [
          {
            name: 'One',
            content: 'Content for one',
          },
          {
            name: 'Two',
            content: 'Content for two',
          },
          {
            name: 'Three',
            content: 'Content for three',
          },
        ],
      },
      {
        id: 3,
        name: 'Germany',
        area: 357114,
        population: 82114224,
      },
      {
        id: 4,
        name: 'Portugal',
        area: 92090,
        population: 10329506,
      },
      {
        id: 5,
        name: 'Canada',
        area: 9976140,
        population: 36624199,
      },
      {
        id: 6,
        name: 'Vietnam',
        area: 331212,
        population: 95540800,
      },
      {
        id: 7,
        name: 'Brazil',
        area: 8515767,
        population: 209288278,
      },
      {
        id: 8,
        name: 'Mexico',
        area: 1964375,
        population: 129163276,
      },
      {
        id: 9,
        name: 'United States',
        area: 9629091,
        population: 324459463,
      },
      {
        id: 10,
        name: 'India',
        area: 3287263,
        population: 1324171354,
      },
      {
        id: 11,
        name: 'Indonesia',
        area: 1910931,
        population: 263991379,
      },
      {
        id: 12,
        name: 'Tuvalu',
        area: 26,
        population: 11097,
      },
      {
        id: 13,
        name: 'China',
        area: 9596960,
        population: 1409517397,
      },
    ];
  }
}
