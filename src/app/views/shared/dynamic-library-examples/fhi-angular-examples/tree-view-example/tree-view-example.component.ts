import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, Input } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';


interface NavigationNode {
  name: string;
  id: string;
  uri?: string;
  children?: NavigationNode[];
}

const NAVIGATION_TREE_DATA: NavigationNode[] = [
  {
    name: 'For utviklere',
    id: 'i_1',
    uri: '/developer',
    children: [
      { name: 'Visuell identitet', id: 'i_1-1', uri: '/developer/visual-identity' },
      { name: 'Komponenter', id: 'i_1-2', uri: '/developer/components' },
      {
        name: 'Moduler',
        id: 'i_1-3',
        uri: '/developer/modules',
        children: [
          { name: 'Tree view', id: 'i_1-3-1', uri: '/developer/modules/TreeView' }
        ]
      },
      { name: 'Layout og sidemaler', id: 'i_1-4', uri: '/developer/layout-and-page-templates' }
    ],
  },
  {
    name: 'For designere',
    id: 'i_2',
    uri: '/designer',
  },
  {
    name: 'Fhi.no (ekstern lenke)',
    id: 'i_3',
    uri: 'https://fhi.no/'
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
}
