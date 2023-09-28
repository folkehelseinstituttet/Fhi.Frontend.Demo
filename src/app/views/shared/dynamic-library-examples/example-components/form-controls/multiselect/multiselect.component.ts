import { Component } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';
import { MultiselectDataService, Person } from './multiselect-data.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-multiselect',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './multiselect.component.html',
})
export class MultiselectComponent {

  constructor(private multiselectDataService: MultiselectDataService) {}

  people: Person[] = [];
  selectedPeople = [];

  ngOnInit() {
    this.multiselectDataService.getPeople()
      .pipe(map(x => x.filter(y => !y.disabled)))
      .subscribe((people) => {
        this.people = people;
        this.selectedPeople = [this.people[0].id, this.people[1].id];
      });
  }
}
