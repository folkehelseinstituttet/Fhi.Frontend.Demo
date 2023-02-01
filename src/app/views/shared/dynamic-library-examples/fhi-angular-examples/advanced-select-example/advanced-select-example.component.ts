import { Component, Input } from '@angular/core';
import { map } from 'rxjs/operators';

import { AdvancedSelectExampleDataService, Person } from './advanced-select-example-data.service';

@Component({
  selector: 'app-advanced-select-example',
  templateUrl: './advanced-select-example.component.html'
})
export class AdvancedSelectExampleComponent {

  @Input() itemId!: string;
  @Input() itemIds!: any;

  // Autosuggest
  selectedCar: number;
  cars = [
    { id: 1, name: 'Volvo' },
    { id: 2, name: 'Saab' },
    { id: 3, name: 'Opel' },
    { id: 4, name: 'Audi' }
  ];

  // Multiselect
  people: Person[] = [];
  selectedPeople = [];

  constructor(private dataService: AdvancedSelectExampleDataService) { }

  ngOnInit() {
    this.dataService.getPeople()
      .pipe(map(x => x.filter(y => !y.disabled)))
      .subscribe((people) => {
        this.people = people;
        this.selectedPeople = [this.people[0].id, this.people[1].id];
      });
  }

}
