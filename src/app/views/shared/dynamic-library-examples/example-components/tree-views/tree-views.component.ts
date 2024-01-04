import { ChangeDetectorRef, Component, Input } from '@angular/core';

import { LibraryItemsShared } from '../../../models/library-item.model';
import {
  FhiTreeViewNavigationItem,
  FhiTreeViewSelectionItem,
} from '@folkehelseinstituttet/angular-components';

@Component({
  selector: 'app-tree-views',
  templateUrl: './tree-views.component.html',
})
export class TreeViewsComponent {
  @Input() itemId!: string;
  @Input() items!: LibraryItemsShared;

  treeNavItems: any[];

  itemsCheck!: FhiTreeViewSelectionItem[];
  itemsRadio!: FhiTreeViewSelectionItem[];

  constructor(private changeDetector: ChangeDetectorRef) {}

  ngOnInit() {
    this.itemsCheck = this.getTreeviewSelectionItems();
    this.itemsRadio = this.getTreeviewSelectionItems();
    this.treeNavItems = this.getTreeviewNavigationItems();
    this.changeDetector.detectChanges();
  }

  onItemsChangeCheck(items: FhiTreeViewSelectionItem[]) {
    this.itemsCheck = items;
  }

  onItemsChangeRadio(items: FhiTreeViewSelectionItem[]) {
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

  private getTreeviewSelectionItems(): FhiTreeViewSelectionItem[] {
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
