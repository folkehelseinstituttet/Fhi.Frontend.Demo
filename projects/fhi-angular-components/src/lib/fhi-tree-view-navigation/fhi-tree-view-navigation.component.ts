import { Component, Input } from '@angular/core';

@Component({
  selector: 'fhi-tree-view-navigation',
  templateUrl: './fhi-tree-view-navigation.component.html'
})
export class FhiTreeViewNavigationComponent {

  @Input() items: Array<any> = [];

}
