import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ViewportScroller } from '@angular/common';

import { LibraryItem, LibraryItemType } from '../../shared/models/library-item.model';
import { MenuItem } from 'src/app/models/menu-item.model';
import { LibraryItemConstants } from 'src/MOCK_DB_DATA/library-items/library-item-constants';
import { SharedConstants } from '../../shared/shared.constants';

const MenuItemName = {
  example: 'Eksempel',
  documentation: 'Dokumentasjon',
};

@Component({
  selector: 'app-library-item',
  templateUrl: './library-item.component.html',
})
export class LibraryItemComponent implements OnInit {
  @Input() groupId: string;
  @Input() isDebugging: boolean;
  @Input() libraryItem: LibraryItem;

  id: string;
  title: string;
  titleLang: string;
  type: number;
  exampleHtml: string;
  documentationHtml: string;
  codeHtml: string;
  fullScreenEnabled: boolean;

  itemTypeHtml = LibraryItemType.html;
  activeMenuItemByDefault = 0;
  navTabMenuItems: MenuItem[];
  MenuItemName = MenuItemName;

  langNO: string = LibraryItemConstants.languageLocaleId_NO;
  langEN: string = SharedConstants.languageLocaleId_EN;

  constructor(
    private activatedRoute: ActivatedRoute,
    private viewportScroller: ViewportScroller,
  ) {}

  ngOnInit() {
    this.setItemData(this.libraryItem);
    this.navTabMenuItems = this.navTabMenuItemsArray();
  }

  ngAfterViewInit() {
    if (this.activatedRoute.snapshot.fragment === this.id) {
      this.viewportScroller.scrollToAnchor(this.id);
    }
  }

  private setItemData(item: LibraryItem) {
    this.id = item.id;
    this.title = item.title;
    this.titleLang = item.titleLang;
    this.type = item.type;
    this.exampleHtml = item.exampleHtml;
    this.codeHtml = this.getCodeHtml(item);
    this.documentationHtml = item.documentationHtml;
    this.fullScreenEnabled = item.fullScreenEnabled;
  }

  private getCodeHtml(item: LibraryItem): string {
    if (item.codeHtml !== null && item.codeHtml !== '') {
      return item.codeHtml.trim();
    }
    if (item.exampleHtml !== '' && item.codeHtml === '') {
      return item.exampleHtml.trim();
    }
    return null;
  }

  private navTabMenuItemsArray(): MenuItem[] {
    let n = 0;
    const menuItems: MenuItem[] = [];

    menuItems[n++] = {
      name: MenuItemName.example,
      link: null,
    };
    if (this.documentationHtml !== null) {
      menuItems[n++] = {
        name: MenuItemName.documentation,
        link: null,
      };
    }
    return menuItems;
  }
}
