import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, Input } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';


interface NavigationNode {
  name: string;
  uri?: string;
  children?: NavigationNode[];
}

const NAVIGATION_TREE_DATA: NavigationNode[] = [
  {
    name: 'For utviklere',
    uri: '/developer',
    children: [
      { name: 'Visuell identitet', uri: '/developer/visual-identity' },
      { name: 'Komponenter', uri: '/developer/components' },
      {
        name: 'Moduler',
        uri: '/developer/modules',
        children: [
          { name: 'Tree view', uri: '/developer/modules/TreeView' }
        ]
      },
      { name: 'Layout og sidemaler', uri: '/developer/layout-and-page-templates' }
    ],
  },
  {
    name: 'For designere',
    uri: '/designer',
  },
  {
    name: 'Fhi.no (ekstern lenke)',
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
