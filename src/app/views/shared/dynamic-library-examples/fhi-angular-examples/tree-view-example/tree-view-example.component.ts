import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, Input } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { initial } from 'lodash-es';


interface NavigationNode {
  name: string;
  id: string;
  uri?: string;
  checked?: boolean;
  children?: NavigationNode[];
  anyCheckedInSelection?: boolean;
}

const NAVIGATION_TREE_DATA: NavigationNode[] = [
  {
    name: 'For utviklere',
    id: 'i_1',
    uri: '/developer',
    anyCheckedInSelection: true,
    children: [
      {
        name: 'Visuell identitet',
        id: 'i_1-1',
        uri: '/developer/visual-identity'
      },
      {
        name: 'Komponenter',
        id: 'i_1-2',
        uri: '/developer/components',
        children: [
          { name: 'Accordions', id: 'i_1-2-1', uri: '/developer/modules/Accordion'},
          { name: 'Advanced select', id: 'i_1-2-2', uri: '/developer/modules/AdvancedSelect'},
          { name: 'Alerts', id: 'i_1-2-3', uri: '/developer/modules/Alerts'}
        ]
      },
      {
        name: 'Moduler',
        id: 'i_1-3',
        uri: '/developer/modules',
        anyCheckedInSelection: true,
        children: [
          { name: 'Global footer', id: 'i_1-3-1', uri: '/developer/modules/GlobalFooter' },
          { name: 'Global header', id: 'i_1-3-2', uri: '/developer/modules/GlobalHeader' },
          { name: 'Drawer', id: 'i_1-3-3', uri: '/developer/modules/Drawer' },
          { name: 'Tree view', id: 'i_1-3-4', uri: '/developer/modules/TreeView', checked: true }
        ]
      },
      {
        name: 'Layout og sidemaler',
        id: 'i_1-4',
        uri: '/developer/layout-and-page-templates'
      }
    ],
  },
  {
    name: 'For designere',
    id: 'i_2',
    uri: '/designer',
  }
];
@Component({
  selector: 'app-tree-view-example',
  templateUrl: './tree-view-example.component.html'
})
export class TreeViewExampleComponent {
  @Input() itemId!: string;
  @Input() itemIds!: any;

  treeControl = new NestedTreeControl<NavigationNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<NavigationNode>();

  constructor() {
    this.dataSource.data = NAVIGATION_TREE_DATA;
    this.checkTreeState();
  }

  treeViewSimpleNodes: any = [
    {
      name: 'rot 1',
      children: [
        { name: 'barn 1.1' },
        { name: 'barn 1.2' }
      ]
    },
    {
      name: 'rot 2',
      children: [
        { name: 'barn 2.1', children: [] },
        {
          name: 'barn 2.2', children: [
            { name: 'barnebarn 2.2.1' }
          ]
        }
      ]
    },
    { name: 'rot 3' }
  ];

  hasChild = (_: number, node: NavigationNode) => !!node.children && node.children.length > 0;

  checkTreeState = (checkedNodeId?: string) => {
    if (checkedNodeId) {
      console.log(searchNode(checkedNodeId, NAVIGATION_TREE_DATA));

      function searchNode(id: string, currentNode: any) {
        let findingNode: any;

        for (const [key, value] of Object.entries(currentNode)) {
          if (key == "id" && value === id) {
            return currentNode;
          }

          if (value !== null && typeof value === "object") {
            findingNode = searchNode(id, value);

            if (findingNode) {
              return findingNode;
            }
          }
        }
      }
    }
  }
}
