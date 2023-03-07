import { Component, OnInit } from '@angular/core';

import { FhiTreeViewNavigationNode } from '@folkehelseinstituttet/angular-components';

@Component({
  selector: 'app-tree-view-navigation-example',
  templateUrl: './tree-view-navigation-example.component.html'
})
export class TreeViewNavigationExampleComponent implements OnInit {

  items: any[];

  ngOnInit() {
    this.items = this.getTreeviewNavigationItems();
  }

  private getTreeviewNavigationItems(): FhiTreeViewNavigationNode[] {
    return [{
      name: 'For utviklere',
      link: '/developer',
      hasActiveChild: true,
      children: [{
        name: 'Visuell identitet',
        link: '/developer/visual-identity'
      }, {
        name: 'Komponenter',
        link: '/developer/components',
        children: [
          { name: 'Accordions', link: '/developer/modules/Accordion'},
          { name: 'Advanced select', link: '/developer/modules/AdvancedSelect'},
          { name: 'Alerts', link: '/developer/modules/Alerts'}
        ]
      }, {
        name: 'Moduler',
        link: '/developer/modules',
        hasActiveChild: true,
        children: [
          { name: 'Global footer', link: '/developer/modules/GlobalFooter' },
          { name: 'Global header', link: '/developer/modules/GlobalHeader' },
          { name: 'Drawer', link: '/developer/modules/Drawer' },
          { name: 'Tree view', isActive: true }
        ]
      }, {
        name: 'Layout og sidemaler',
        link: '/developer/layout-and-page-templates'
      }],
    }, {
      name: 'For designere',
      link: '/designer',
    }];
  }

}
