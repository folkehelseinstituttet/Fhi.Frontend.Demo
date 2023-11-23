import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';

import { FhiTreeViewSelectionItem } from '@folkehelseinstituttet/angular-components';

@Component({
  selector: 'app-tree-view-selection-example',
  templateUrl: './tree-view-selection-examples.component.html',
})
export class TreeViewSelectionExampleComponent implements OnInit {
  @Input() itemId!: string;
  @Input() itemIds!: any;

  itemsCheck!: FhiTreeViewSelectionItem[];
  itemsRadio!: FhiTreeViewSelectionItem[];

  constructor(private changeDetector: ChangeDetectorRef) {}

  ngOnInit() {
    this.itemsCheck = this.getTreeviewSelectionItems();
    this.itemsRadio = this.getTreeviewSelectionItems();
    this.changeDetector.detectChanges();
  }

  onItemsChangeCheck(items: FhiTreeViewSelectionItem[]) {
    // console.log('onCheckedItemsChange()->items', items);
    this.itemsCheck = items;
  }

  onItemsChangeRadio(items: FhiTreeViewSelectionItem[]) {
    this.itemsRadio = items;
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
            name: 'Moduler',
            children: [
              { name: 'Global footer' },
              { name: 'Global header' },
              { name: 'Drawer' },
              {
                isChecked: true,
                name: 'Tree view',
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
