import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-date-and-time-selection-example',
  templateUrl: './date-and-time-selection-example.component.html'
})
export class DateAndTimeSelectionExampleComponent {

  @Input() itemId!: string;
  @Input() itemIds!: any;

  selectedFromYear: number;
  selectedToYear: number;
  selectedYear: number;
  selectedWeek: number;

  yearList = [
    { id: 1, name: '2020' },
    { id: 2, name: '2021' },
    { id: 3, name: '2022' },
    { id: 4, name: '2023' },
    { id: 5, name: '2024' }
  ];

  weekList = [];

  ngOnInit() {
    this.generateWeekList();
  }

  updateYearTo = () => {
    console.log('Fra: ', this.selectedFromYear);
  }

  updateYearFrom = () => {
    console.log('Til: ', this.selectedToYear);
  }

  generateWeekList = () => {
    for (let i = 1; i <= 53; i++) {
      this.weekList.push({ id: i, name: 'Uke ' + i });
    }
  }

}
