import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';

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
  itemsRadio!: FhiTreeViewSelectionItem[];
  checkAll: boolean = true;
  hasRadioButtons: boolean = true;

  itemsCheck1!: FhiTreeViewSelectionItem[];
  itemsCheck2!: FhiTreeViewSelectionItem[];
  itemsCheck3!: FhiTreeViewSelectionItem[];

  constructor(private changeDetector: ChangeDetectorRef) {}

  ngOnInit() {
    // this.itemsCheck = this.getTreeViewSelectionItems();
    this.itemsCheck1 = this.getTreeViewSelectionItems_TEST(1);
    this.itemsCheck2 = this.getTreeViewSelectionItems_TEST(1);
    this.itemsCheck3 = this.getTreeViewSelectionItems_TEST(1);

    this.itemsRadio = this.getTreeViewSelectionItems();
    this.treeNavItems = this.getTreeviewNavigationItems();
    this.changeDetector.detectChanges();
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

  private getTreeViewSelectionItems_TEST(instance?: number): FhiTreeViewSelectionItem[] {
    return [
      {
        name: 'For utviklere',
        // id: 10 * instance + 1,
        children: [
          {
            name: 'Visuell identitet',
            // id: 10 * instance + 2,
          },
          {
            name: 'Komponenter',
            id: 10 * instance + 3,
            children: [
              {
                name: 'Accordions',
                // id: 10 * instance + 4,
              },
              {
                name: 'Advanced select',
                id: 10 * instance + 5,
              },
              {
                name: 'Alerts',
                id: 10 * instance + 6,
              },
            ],
          },
          {
            name: 'Layout og sidemaler',
            id: 10 * instance + 7,
          },
        ],
      },
      {
        name: 'For designere',
        id: 10 * instance + 8,
      },
      {
        name: 'Github',
        id: 10 * instance + 9,
        children: [
          {
            name: 'Fhi.Frontend.Style',
            id: 10 * instance + 10,
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
    ];
  }
}
