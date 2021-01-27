import { Component, Input, OnInit } from '@angular/core';
import { LibraryExampleNavModel } from '../models/library-example-nav.model';

@Component({
  selector: 'app-library-example-detail-nav',
  templateUrl: './library-example-detail-nav.component.html'
})
export class LibraryExampleDetailNavComponent implements OnInit {

  @Input() libraryExampleNavModels: LibraryExampleNavModel[];
  constructor() { }

  activeNav;
  navIds;

  ngOnInit(): void {
    this.navIds = this.libraryExampleNavModels.map(example => example.id);
  }

  getNavModelById(id: number){
    return this.libraryExampleNavModels.find(example => example.id === id);
  }
}
