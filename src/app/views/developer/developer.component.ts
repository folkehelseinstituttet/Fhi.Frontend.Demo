import { Component, OnInit } from '@angular/core';

import { MenuItem } from 'src/app/models/menu-item.model';
import { MenuData } from './developer-menu-data';

@Component({
  selector: 'app-developer',
  templateUrl: './developer.component.html'
})
export class DeveloperComponent implements OnInit {

  topLevelMenuItems: MenuItem[] = MenuData.menutems;

  constructor() { }

  ngOnInit() {
  }

}
