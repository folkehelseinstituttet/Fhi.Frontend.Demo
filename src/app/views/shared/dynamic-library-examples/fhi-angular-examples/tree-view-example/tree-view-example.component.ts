import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tree-view-example',
  templateUrl: './tree-view-example.component.html'
})
export class TreeViewExampleComponent {
  @Input() itemId!: string;
  @Input() itemIds!: any;

  simpleNodes:any = [
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
        { name: 'barn 2.2', children: [
            {name: 'barnebarn 2.2.1'}
          ] }
      ]
    },
    { name: 'rot 3' }
  ];

  navigationNodes:any = [
    {
      name: 'Forsiden',
      uri: '/',
      children: [
        {
          name: 'For utviklere',
          uri: '/developer/',
          children: [
            {
              name: 'Visuell identitet',
              uri: '/developer/visual-identity/'
            },
            {
              name: 'Komponenter',
              uri: '/developer/components/'
            },
            {
              name: 'Moduler',
              uri: '/developer/modules/'
            },
            {
              name: 'Layout og sidemaler',
              uri: '/developer/layout-and-page-templates/'
            }
          ]
        },
        {
          name: 'For designere',
          uri: '/designer/'
        }
      ]
    }, {
      name: 'FHI.no',
      uri: 'https://fhi.no/'
    }
  ]
}
