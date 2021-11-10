import { Component, OnInit } from '@angular/core';

import { LibraryAngularMenu } from './constants/library-angular-menu';

@Component({
  selector: 'app-library-angular',
  templateUrl: './library-angular.component.html'
})
export class LibraryAngularComponent implements OnInit {

  constructor() { }

  libraryMenuLevel1Items = LibraryAngularMenu.level1Items;

  ngOnInit(): void {
  }

}
