import { Component, Input, OnInit } from '@angular/core';

import { LibraryItemsShared } from '../../../models/library-item.model';
import {
  FhiTreeViewNavigationItem,
  FhiTreeViewSelectionItem,
} from '@folkehelseinstituttet/angular-components';

// import { alleAtcKoderSomItems } from './alle_atckoder_som_items'; // use this for stress testing fhi-tree-view-checkbox or fhi-tree-view-radio with large dataset

@Component({
  selector: 'app-tree-views',
  templateUrl: './tree-views.component.html',
})
export class TreeViewsComponent implements OnInit {
  @Input() itemId!: string;
  @Input() items!: LibraryItemsShared;

  treeNavItems: FhiTreeViewNavigationItem[];
  itemsCheck!: FhiTreeViewSelectionItem[];
  itemsCheck2!: FhiTreeViewSelectionItem[];
  itemsRadio!: FhiTreeViewSelectionItem[];
  checkAll: boolean = true;
  hasRadioButtons: boolean = true;

  ngOnInit() {
    this.itemsCheck = this.getTreeViewSelectionItems();
    this.itemsRadio = this.getTreeViewSelectionItems();
    this.treeNavItems = this.getTreeviewNavigationItems();
  }

  onCheckboxChange(items: FhiTreeViewSelectionItem[]) {
    this.itemsCheck = items;
  }

  onRadioChange(items: FhiTreeViewSelectionItem[]) {
    this.itemsRadio = items;
  }

  private getTreeviewNavigationItems(): FhiTreeViewNavigationItem[] {
    return [
      {
        name: 'For utviklere',
        routerLink: '/developer',
        isExpanded: true,
        hasActiveDescendant: true,
        children: [
          {
            name: 'Visuell identitet',
            routerLink: '/developer/visual-identity',
          },
          {
            name: 'Komponenter',
            routerLink: '/developer/components',
            children: [
              { name: 'Accordions', routerLink: '/developer/modules/Accordion' },
              { name: 'Advanced select', routerLink: '/developer/modules/AdvancedSelect' },
              { name: 'Alerts', routerLink: '/developer/modules/Alerts' },
            ],
          },
          {
            name: 'Layout og sidemaler',
            routerLink: '/developer/layout-and-page-templates',
          },
        ],
      },
      {
        name: 'For designere',
        routerLink: '/designer',
      },
      {
        name: 'Github',
        children: [
          {
            name: 'Fhi.Frontend.Style',
            href: 'https://github.com/folkehelseinstituttet/Fhi.Frontend.Style',
          },
        ],
      },
    ];
  }

  private getTreeViewSelectionItems(): FhiTreeViewSelectionItem[] {
    return [
      {
        name: 'For utviklere',
        children: [
          {
            name: 'Visuell identitet',
          },
          {
            name: 'Komponenter',
            children: [
              {
                name: 'Accordions',
              },
              {
                name: 'Advanced select',
              },
              {
                name: 'Alerts',
              },
            ],
          },
          {
            name: 'Layout og sidemaler',
          },
        ],
      },
      {
        name: 'For designere',
        id: 'for-designere',
      },
      {
        name: 'Github',
        children: [
          {
            name: 'Fhi.Frontend.Style',
          },
        ],
      },
    ];
  }
}
