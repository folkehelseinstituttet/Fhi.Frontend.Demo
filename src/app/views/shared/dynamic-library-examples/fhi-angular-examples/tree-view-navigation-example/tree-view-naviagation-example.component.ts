import { Component, OnInit } from '@angular/core';

interface FhiTreeViewNavigationItem {
  active?: boolean;
  children?: FhiTreeViewNavigationItem[];
  name: string;
  uri?: string;
}


@Component({
  selector: 'app-tree-view-navigation-example',
  templateUrl: './tree-view-navigation-example.component.html'
})
export class TreeViewNavigationExampleComponent implements OnInit {

  items: FhiTreeViewNavigationItem[];

  ngOnInit() {
    this.items = this.getTreeviewNavigationItems();
  }

  private getTreeviewNavigationItems(): FhiTreeViewNavigationItem[] {
    return [{
      name: 'For utviklere',
      uri: '/developer',
      children: [{
        name: 'Visuell identitet',
        uri: '/developer/visual-identity'
      }, {
        name: 'Komponenter',
        uri: '/developer/components',
        children: [
          { name: 'Accordions', uri: '/developer/modules/Accordion'},
          { name: 'Advanced select', uri: '/developer/modules/AdvancedSelect'},
          { name: 'Alerts', uri: '/developer/modules/Alerts'}
        ]
      }, {
        name: 'Moduler',
        uri: '/developer/modules',
        children: [
          { name: 'Global footer', uri: '/developer/modules/GlobalFooter' },
          { name: 'Global header', uri: '/developer/modules/GlobalHeader' },
          { name: 'Drawer', uri: '/developer/modules/Drawer' },
          { name: 'Tree view', uri: '/developer/modules/TreeView' }
        ]
      }, {
        name: 'Layout og sidemaler',
        uri: '/developer/layout-and-page-templates'
      }],
    }, {
      name: 'For designere',
      uri: '/designer',
    }];
  }

}
