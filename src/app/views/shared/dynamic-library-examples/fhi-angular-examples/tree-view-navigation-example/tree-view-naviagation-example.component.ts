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
      routerLink: '/developer',
      hasActiveChild: true,
      children: [{
        name: 'Visuell identitet',
        routerLink: '/developer/visual-identity'
      }, {
        name: 'Komponenter',
        routerLink: '/developer/components',
        children: [
          { name: 'Accordions', routerLink: '/developer/modules/Accordion'},
          { name: 'Advanced select', routerLink: '/developer/modules/AdvancedSelect'},
          { name: 'Alerts', routerLink: '/developer/modules/Alerts'}
        ]
      }, {
        name: 'Moduler',
        routerLink: '/developer/modules',
        hasActiveChild: true,
        children: [
          { name: 'Global footer', routerLink: '/developer/modules/GlobalFooter' },
          { name: 'Global header', routerLink: '/developer/modules/GlobalHeader' },
          { name: 'Drawer', href: 'https://designsystem.fhi.no/developer/modules/Drawer' },
          { name: 'Tree view', isActive: true }
        ]
      }, {
        name: 'Layout og sidemaler',
        routerLink: '/developer/layout-and-page-templates'
      }],
    }, {
      name: 'For designere',
      routerLink: '/designer',
    }];
  }

}
