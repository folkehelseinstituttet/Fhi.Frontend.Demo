import { Component, OnInit } from '@angular/core';

import { FhiTreeViewNavigationNode } from '@folkehelseinstituttet/angular-components';

@Component({
  selector: 'app-tree-view-navigation-example',
  templateUrl: './tree-view-navigation-example.component.html'
})
export class TreeViewNavigationExampleComponent implements OnInit {

  nodes: any[];

  ngOnInit() {
    this.nodes = this.getTreeviewNavigationNodes();
  }

  private getTreeviewNavigationNodes(): FhiTreeViewNavigationNode[] {
    return [{
      id: 'a',
      name: 'For utviklere',
      routerLink: '/developer',
      isExpanded: true,
      hasActiveDescendant: true,
      children: [{
        id: 'b',
        name: 'Visuell identitet',
        routerLink: '/developer/visual-identity'
      }, {
        id: 'c',
        name: 'Komponenter',
        routerLink: '/developer/components',
        children: [
          { id: 'd', name: 'Accordions', routerLink: '/developer/modules/Accordion'},
          { id: 'e', name: 'Advanced select', routerLink: '/developer/modules/AdvancedSelect'},
          { id: 'f', name: 'Alerts', routerLink: '/developer/modules/Alerts'}
        ]
      }, {
        id: 'g',
        name: 'Moduler',

        // Commented out routerLink to get "active no-link"-node
        // routerLink: '/developer/modules',

        isExpanded: true,
        hasActiveDescendant: true,
        children: [
          { id: 'h', name: 'Global footer', routerLink: '/developer/modules/GlobalFooter' },
          { id: 'i', name: 'Global header', routerLink: '/developer/modules/GlobalHeader' },
          { id: 'j', name: 'Drawer', routerLink: '/developer/modules/Drawer' },
          { id: 'k', name: 'Tree view', routerLink: '/developer/modules/TreeView'}
        ]
      }, {
        id: 'l',
        name: 'Layout og sidemaler',
        routerLink: '/developer/layout-and-page-templates'
      }],
    }, {
      id: 'm',
      name: 'For designere',
      routerLink: '/designer',
    }, {
      id: 'n',
      name: 'Github',
      children: [{
        id: 'o',
        name: 'Fhi.Frontend.Style',
        href: 'https://github.com/folkehelseinstituttet/Fhi.Frontend.Style',
      }]
    }];
  }

}
