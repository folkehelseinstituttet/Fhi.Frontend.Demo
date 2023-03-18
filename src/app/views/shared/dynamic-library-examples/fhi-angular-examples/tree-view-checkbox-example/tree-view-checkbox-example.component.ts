import { Component, OnInit } from '@angular/core';

import { FhiTreeViewCheckboxItem } from '@folkehelseinstituttet/angular-components';

@Component({
  selector: 'app-tree-view-checkbox-example',
  templateUrl: './tree-view-checkbox-example.component.html'
})
export class TreeViewCheckboxExampleComponent implements OnInit {

  items: any[];

  ngOnInit() {
    this.items = this.getTreeviewCheckboxItems();
  }

  onCheckedItemsChange(items: FhiTreeViewCheckboxItem[]) {
    console.log('onCheckedItemsChange()->items', items);
    this.items = items;
  }

  private getTreeviewCheckboxItems(): FhiTreeViewCheckboxItem[] {
    return [{
      name: 'For utviklere',
      children: [{
        name: 'Visuell identitet',
      }, {
        name: 'Komponenter',
        children: [
          {
            name: 'Accordions'
          },
          {
            name: 'Advanced select'
          },
          {
            name: 'Alerts',
          }
        ]
      }, {
        name: 'Moduler',
        children: [
          { name: 'Global footer' },
          { name: 'Global header' },
          { name: 'Drawer' },
          {
            isChecked: true,
            name: 'Tree view'
          }
        ]
      }, {
        name: 'Layout og sidemaler',
      }],
    }, {
      name: 'For designere',
      id: 'for-designere'
    }, {
      name: 'Github',
      children: [{
        name: 'Fhi.Frontend.Style',
      }]
    }];
  }

}
