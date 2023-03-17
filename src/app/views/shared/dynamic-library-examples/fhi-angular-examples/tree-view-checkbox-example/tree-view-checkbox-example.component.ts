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
    // console.log('TreeViewCheckboxExampleComponent.ngOnInit()');
  }

  onTreeViewCheckboxToggle(items: FhiTreeViewCheckboxItem[]) {
    console.log('onItemsChange->items', items);
  }

  private getTreeviewCheckboxItems(): FhiTreeViewCheckboxItem[] {
    return [{
      name: 'For utviklere',
      isExpanded: true,
      hasCheckedDescendant: true,
      children: [{
        name: 'Visuell identitet',
      }, {
        name: 'Komponenter',
        children: [
          { name: 'Accordions' },
          { name: 'Advanced select' },
          { name: 'Alerts' }
        ]
      }, {
        name: 'Moduler',

        // Commented out routerLink to get "active no-link"-node
        // routerLink: '/developer/modules',

        isExpanded: true,
        hasCheckedDescendant: true,
        children: [
          { name: 'Global footer' },
          { name: 'Global header' },
          { name: 'Drawer' },
          { name: 'Tree view' }
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
