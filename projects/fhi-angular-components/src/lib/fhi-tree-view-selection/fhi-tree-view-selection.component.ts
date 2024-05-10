import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { FhiTreeViewSelectionItem as Item } from './fhi-tree-view-selection-item.model';
import { FhiTreeViewSelectionItemState } from './fhi-tree-view-selection-item.model';
import { isEqual } from 'lodash-es';

@Component({
  selector: 'fhi-tree-view-selection',
  standalone: true,
  templateUrl: './fhi-tree-view-selection.component.html',
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FhiTreeViewSelectionComponent implements OnInit, OnChanges {
  @Input() enableCheckAll = false;
  @Input() singleSelection = false;
  @Input() items: Item[];
  @Input() name: string;

  @Output() itemsChange = new EventEmitter<Item[]>();

  ngOnInit() {
    if (this.enableCheckAll) {
      this.singleSelection = false;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.items !== undefined) {
      // this.items = koder;
      if (changes.items) {
        if (changes.items.isFirstChange()) {
          this.createIds(this.items, 1);
          this.updateDecendantState(this.items, true);
        } else {
          // Update decendantsState only if state has changed
          if (!isEqual(this.items, changes.items.currentValue)) {
            this.updateDecendantState(this.items, true);
          }
        }
      }
    }
  }

  toggleExpanded(item: Item) {
    item.isExpanded = !item.isExpanded;
  }

  toggleChecked(id: number | string, multiToggle = false, checkAll = false) {
    this.updateCheckedState(id, this.items, multiToggle, checkAll);
    this.updateDecendantState(this.items, false);
    if (!multiToggle) {
      this.itemsChange.emit(this.items);
    }
  }

  checkAll(items: Item[]) {
    items.forEach((item) => {
      this.toggleChecked(item.id, true, true);
    });
    this.itemsChange.emit(this.items);
  }

  uncheckAll(items: Item[]) {
    items.forEach((item) => {
      this.toggleChecked(item.id, true);
    });
    this.itemsChange.emit(this.items);
  }

  allItemsChecked(items: Item[]): boolean {
    return items.every((item) => item.isChecked);
  }

  private updateCheckedState(
    id: number | string,
    items: Item[],
    multiToggle: boolean,
    checkAll: boolean,
  ) {
    items.forEach((item) => {
      if (item.id === id) {
        if (multiToggle) {
          checkAll ? (item.isChecked = true) : (item.isChecked = false);
        } else if (!this.singleSelection) {
          item.isChecked = !item.isChecked;
        } else if (this.singleSelection) {
          item.isChecked = true;
        }
      }
      if (this.singleSelection && item.id !== id) {
        item.isChecked = null;
      }
      if (item.children && item.children.length > 0) {
        this.updateCheckedState(id, item.children, multiToggle, checkAll);
      }
      item.descendantStateConfirmed = false;
    });
  }

  private updateDecendantStateDifferentLogic(
    items: Item[],
    expandCheckedItems: boolean,
  ): FhiTreeViewSelectionItemState {
    const itemsState = {
      hasExpandedDescendant: false,
      hasCheckedDescendant: false,
    };
    if (items && items.length > 0) {
      items.forEach((item) => {
        // Make sure isChecked and isExpanded is always set, if not the default to false
        item.isChecked = item.isChecked || false;
        item.isExpanded = item.isExpanded || false;
        if (item.children && item.children.length > 0) {
          const childrensState = this.updateDecendantState(item.children, expandCheckedItems);
          // Update hasCheckedDescendant in the allItemsState  in this loop based on the stat in  this items children
          itemsState.hasCheckedDescendant =
            itemsState.hasCheckedDescendant || // One of the other items has checked descendtans, so dont overwrite it
            item.isChecked || // The item is checked, so count it in
            childrensState.hasCheckedDescendant; // One of the children of this item has a checked decendant
          // Update hasExpandedDecendant in the allItemsState if one of the children has expandedDecendants
          itemsState.hasExpandedDescendant =
            itemsState.hasExpandedDescendant || childrensState.hasExpandedDescendant;
          // Make sure this item is expanded if any og the chldren is expanded
          item.isExpanded = item.isExpanded || childrensState.hasExpandedDescendant;
          if (expandCheckedItems) {
            item.isExpanded = item.isExpanded || item.isChecked;
            itemsState.hasExpandedDescendant = itemsState.hasExpandedDescendant || item.isChecked;
          }
          item.hasCheckedDescendant = childrensState.hasCheckedDescendant;
        } else {
          // This is leaf node.
          if (item.isChecked) {
            itemsState.hasCheckedDescendant = true;
            itemsState.hasExpandedDescendant = expandCheckedItems;
          } else if (!expandCheckedItems) {
            itemsState.hasExpandedDescendant = item.isExpanded;
          }
        }
      });
    }
    return itemsState;
  }

  private updateDecendantState(
    items: Item[],
    expandCheckedItems: boolean,
  ): FhiTreeViewSelectionItemState {
    const itemsState = {
      hasExpandedDescendant: false,
      hasCheckedDescendant: false,
    };
    if (items && items.length > 0) {
      items.forEach((item) => {
        item.isChecked = item.isChecked || false;
        item.isExpanded = item.isExpanded || false;
        let childrenState: FhiTreeViewSelectionItemState = {
          hasExpandedDescendant: false,
          hasCheckedDescendant: false,
        };
        if (item.children && item.children.length > 0) {
          childrenState = this.updateDecendantState(item.children, expandCheckedItems);
        }
        // Logic for CHECKED
        // Update this items hasCheckedDescendant and the overall hasCheckedDescendant for all items in this loop
        if (item.isChecked) {
          itemsState.hasCheckedDescendant = true;
        } else if (!childrenState.hasCheckedDescendant) {
          item.hasCheckedDescendant = false;
        }
        if (childrenState.hasCheckedDescendant) {
          itemsState.hasCheckedDescendant = true;
          item.hasCheckedDescendant = true;
        }

        // Logic for EXPANDED
        // Update this items expanded and the overall hasExpandedDecendant for all items in this loop
        if (expandCheckedItems) {
          if (item.isChecked) {
            item.isExpanded = true;
            itemsState.hasExpandedDescendant = true;
          }
        }
        itemsState.hasExpandedDescendant =
          itemsState.hasExpandedDescendant || childrenState.hasExpandedDescendant;
        item.isExpanded = item.isExpanded || childrenState.hasExpandedDescendant;

      });
    }
    return itemsState;
  }

  private createIds(items: Item[], id: number) {
    items.forEach((item) => {
      if (item.id === undefined) {
        item.id = id++;
      }
      if (item.children && item.children.length > 0) {
        this.createIds(item.children, (id - 1) * 10 + 1);
      }
    });
  }
}

const koder = [
  {
    id: 'TOTALT',
    name: 'Alle ATC-koder',
    isChecked: false,
    children: [
      {
        id: 'A',
        name: 'A - FORDØYELSESORGANER OG STOFFSKIFTE',
        isChecked: false,
        children: [
          {
            id: 'A01',
            name: 'A01 - MUNN- OG TANNMIDLER',
            isChecked: false,
            children: [
              {
                id: 'A01A',
                name: 'A01A - MUNN- OG TANNMIDLER',
                isChecked: false,
                children: [
                  {
                    id: 'A01AB',
                    name: 'A01AB - Antiinfektiva og antiseptika til lokal behandling i munnen',
                    isChecked: false,
                    children: [
                      {
                        id: 'A01AB02',
                        name: 'A01AB02 - hydrogenperoksid',
                        isChecked: true,
                      },
                      {
                        id: 'A01AB03',
                        name: 'A01AB03 - klorheksidin',
                        isChecked: false,
                      },
                      {
                        id: 'A01AB04',
                        name: 'A01AB04 - amfotericin b',
                        isChecked: false,
                      },
                      {
                        id: 'A01AB09',
                        name: 'A01AB09 - mikonazol',
                        isChecked: false,
                      },
                      {
                        id: 'A01AB11',
                        name: 'A01AB11 - diverse',
                        isChecked: false,
                      },
                      {
                        id: 'A01AB17',
                        name: 'A01AB17 - metronidazol',
                        isChecked: false,
                      },
                    ],
                  },
                  {
                    id: 'A01AC',
                    name: 'A01AC - Kortikosteroider til lokal behandling i munnen',
                    isChecked: false,
                    children: [
                      {
                        id: 'A01AC01',
                        name: 'A01AC01 - triamcinolon',
                        isChecked: false,
                      },
                      {
                        id: 'A01AC03',
                        name: 'A01AC03 - hydrokortison',
                        isChecked: false,
                      },
                    ],
                  },
                  {
                    id: 'A01AD',
                    name: 'A01AD - Andre midler til lokal behandling i munnen',
                    isChecked: false,
                    children: [
                      {
                        id: 'A01AD01',
                        name: 'A01AD01 - adrenalin',
                        isChecked: false,
                      },
                      {
                        id: 'A01AD02',
                        name: 'A01AD02 - benzydamin',
                        isChecked: false,
                      },
                      {
                        id: 'A01AD11',
                        name: 'A01AD11 - diverse',
                        isChecked: false,
                      },
                    ],
                  },
                  {
                    id: 'A01AA',
                    name: 'A01AA - Midler mot karies',
                    isChecked: false,
                    children: [
                      {
                        id: 'A01AA01',
                        name: 'A01AA01 - natriumfluorid',
                        isChecked: false,
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            id: 'A02',
            name: 'A02 - MIDLER MOT SYRERELATERTE LIDELSER',
            isChecked: false,
            children: [
              {
                id: 'A02A',
                name: 'A02A - ANTACIDA',
                isChecked: false,
                children: [
                  {
                    id: 'A02AC',
                    name: 'A02AC - kalsiumforbindelser',
                    isChecked: false,
                    children: [
                      {
                        id: 'A02AC01',
                        name: 'A02AC01 - kalsiumkarbonat',
                        isChecked: false,
                      },
                    ],
                  },
                  {
                    id: 'A02AD',
                    name: 'A02AD - Kombinasjoner og komplekser av aluminium, kalsium og magnesium forbindelser',
                    isChecked: false,
                    children: [
                      {
                        id: 'A02AD01',
                        name: 'A02AD01 - ordinære saltkombinasjoner',
                        isChecked: false,
                      },
                    ],
                  },
                  {
                    id: 'A02AH',
                    name: 'A02AH - Antacida med natriumhydrogenkarbonat',
                    isChecked: false,
                  },
                  {
                    id: 'A02AA',
                    name: 'A02AA - Magnesiumforbindelser',
                    isChecked: false,
                    children: [
                      {
                        id: 'A02AA04',
                        name: 'A02AA04 - magnesiumhydroksid',
                        isChecked: false,
                      },
                    ],
                  },
                ],
              },
              {
                id: 'A02B',
                name: 'A02B - MIDLER MOT ULCUS OG GASTROØSOFAGEAL REFLUKSSYKDOM (GERD)',
                isChecked: false,
                children: [
                  {
                    id: 'A02BA',
                    name: 'A02BA - H2-reseptorantagonister',
                    isChecked: false,
                    children: [
                      {
                        id: 'A02BA01',
                        name: 'A02BA01 - cimetidin',
                        isChecked: false,
                      },
                      {
                        id: 'A02BA02',
                        name: 'A02BA02 - ranitidin',
                        isChecked: false,
                      },
                      {
                        id: 'A02BA03',
                        name: 'A02BA03 - famotidin',
                        isChecked: false,
                      },
                      {
                        id: 'A02BA07',
                        name: 'A02BA07 - ranitidinvismutsitrat',
                        isChecked: false,
                      },
                      {
                        id: 'A02BA53',
                        name: 'A02BA53 - famotidin, kombinasjoner',
                        isChecked: false,
                      },
                    ],
                  },
                  {
                    id: 'A02BB',
                    name: 'A02BB - Prostaglandiner',
                    isChecked: false,
                    children: [
                      {
                        id: 'A02BB01',
                        name: 'A02BB01 - misoprostol',
                        isChecked: false,
                      },
                    ],
                  },
                  {
                    id: 'A02BC',
                    name: 'A02BC - Protonpumpehemmere',
                    isChecked: false,
                    children: [
                      {
                        id: 'A02BC01',
                        name: 'A02BC01 - omeprazol',
                        isChecked: false,
                      },
                      {
                        id: 'A02BC02',
                        name: 'A02BC02 - pantoprazol',
                        isChecked: false,
                      },
                      {
                        id: 'A02BC03',
                        name: 'A02BC03 - lansoprazol',
                        isChecked: false,
                      },
                      {
                        id: 'A02BC05',
                        name: 'A02BC05 - esomeprazol',
                        isChecked: false,
                      },
                    ],
                  },
                  {
                    id: 'A02BX',
                    name: 'A02BX - Andre midler mot ulcus og gastroøsofageal reflukssykdom (GORD)',
                    isChecked: false,
                    children: [
                      {
                        id: 'A02BX02',
                        name: 'A02BX02 - sukralfat',
                        isChecked: false,
                      },
                      {
                        id: 'A02BX12',
                        name: 'A02BX12 - vismut subnitrat',
                        isChecked: false,
                      },
                      {
                        id: 'A02BX13',
                        name: 'A02BX13 - alginsyre',
                        isChecked: false,
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            id: 'A03',
            name: 'A03 - MIDLER MOT FUNKSJONELLE GASTROINTESTINALE LIDELSER',
            isChecked: false,
            children: [
              {
                id: 'A03A',
                name: 'A03A - MIDLER MOT FUNKSJONELLE GASTROINTESTINALE LIDELSER',
                isChecked: false,
                children: [
                  {
                    id: 'A03AB',
                    name: 'A03AB - Syntetiske antikolinergika, kvartære ammoniumforbindelser',
                    isChecked: false,
                    children: [
                      {
                        id: 'A03AB02',
                        name: 'A03AB02 - glykopyrroniumbromid',
                        isChecked: false,
                      },
                      {
                        id: 'A03AB05',
                        name: 'A03AB05 - propantelin',
                        isChecked: false,
                      },
                      {
                        id: 'A03AB07',
                        name: 'A03AB07 - metantelin',
                        isChecked: false,
                      },
                    ],
                  },
                  {
                    id: 'A03AD',
                    name: 'A03AD - Papaverin og derivater',
                    isChecked: false,
                    children: [
                      {
                        id: 'A03AD01',
                        name: 'A03AD01 - papaverin',
                        isChecked: false,
                      },
                    ],
                  },
                  {
                    id: 'A03AX',
                    name: 'A03AX - Andre midler mot funksjonelle gastrointestinale lidelser',
                    isChecked: false,
                    children: [
                      {
                        id: 'A03AX13',
                        name: 'A03AX13 - silikonforbindelser',
                        isChecked: false,
                      },
                      {
                        id: 'A03AX15',
                        name: 'A03AX15 - peppermynteolje',
                        isChecked: false,
                      },
                    ],
                  },
                  {
                    id: 'A03AA',
                    name: 'A03AA - Syntetiske antikolinergika, estre med en tertiær aminogruppe',
                    isChecked: false,
                    children: [
                      {
                        id: 'A03AA04',
                        name: 'A03AA04 - mebeverin',
                        isChecked: false,
                      },
                      {
                        id: 'A03AA05',
                        name: 'A03AA05 - trimebutin',
                        isChecked: false,
                      },
                      {
                        id: 'A03AA07',
                        name: 'A03AA07 - dicykloverin',
                        isChecked: false,
                      },
                    ],
                  },
                ],
              },
              {
                id: 'A03B',
                name: 'A03B - BELLADONNA OG DERIVATER, USAMMENSATTE',
                isChecked: false,
                children: [
                  {
                    id: 'A03BA',
                    name: 'A03BA - Belladonnaalkaloider, tertiære aminer',
                    isChecked: false,
                    children: [
                      {
                        id: 'A03BA01',
                        name: 'A03BA01 - atropin',
                        isChecked: false,
                      },
                      {
                        id: 'A03BA03',
                        name: 'A03BA03 - hyoscyamin',
                        isChecked: false,
                      },
                    ],
                  },
                  {
                    id: 'A03BB',
                    name: 'A03BB - Belladonnaalkaloider halvsyntetiske, kvartære ammonium forbindelser',
                    isChecked: false,
                    children: [
                      {
                        id: 'A03BB01',
                        name: 'A03BB01 - butylskopolamin',
                        isChecked: false,
                      },
                      {
                        id: 'A03BB02',
                        name: 'A03BB02 - metylatropin',
                        isChecked: false,
                      },
                      {
                        id: 'A03BB03',
                        name: 'A03BB03 - metylskopolamin',
                        isChecked: false,
                      },
                    ],
                  },
                ],
              },
              {
                id: 'A03C',
                name: 'A03C - SPASMOLYTIKA I KOMBINASJON MED PSYKOLEPTIKA',
                isChecked: false,
                children: [
                  {
                    id: 'A03CA',
                    name: 'A03CA - Syntetiske antikolinergika i kombinasjon med psykoleptika',
                    isChecked: false,
                    children: [
                      {
                        id: 'A03CA02',
                        name: 'A03CA02 - klidin og psykoleptika',
                        isChecked: false,
                      },
                    ],
                  },
                ],
              },
              {
                id: 'A03F',
                name: 'A03F - MOTILITETSREGULERENDE MIDLER',
                isChecked: false,
                children: [
                  {
                    id: 'A03FA',
                    name: 'A03FA - Motilitetsregulerende midler',
                    isChecked: false,
                    children: [
                      {
                        id: 'A03FA01',
                        name: 'A03FA01 - metoklopramid',
                        isChecked: false,
                      },
                      {
                        id: 'A03FA02',
                        name: 'A03FA02 - cisaprid',
                        isChecked: false,
                      },
                      {
                        id: 'A03FA03',
                        name: 'A03FA03 - domperidon',
                        isChecked: false,
                      },
                      {
                        id: 'A03FA05',
                        name: 'A03FA05 - alisaprid',
                        isChecked: false,
                      },
                      {
                        id: 'A03FA07',
                        name: 'A03FA07 - itoprid',
                        isChecked: false,
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            id: 'A04',
            name: 'A04 - ANTIEMETIKA',
            isChecked: false,
            children: [
              {
                id: 'A04A',
                name: 'A04A - ANTIEMETIKA',
                isChecked: false,
                children: [
                  {
                    id: 'A04AD',
                    name: 'A04AD - Andre antiemetika',
                    isChecked: false,
                    children: [
                      {
                        id: 'A04AD01',
                        name: 'A04AD01 - skopolamin',
                        isChecked: false,
                      },
                      {
                        id: 'A04AD05',
                        name: 'A04AD05 - metopimazin',
                        isChecked: false,
                      },
                      {
                        id: 'A04AD10',
                        name: 'A04AD10 - dronabinol',
                        isChecked: false,
                      },
                      {
                        id: 'A04AD12',
                        name: 'A04AD12 - aprepitant',
                        isChecked: false,
                      },
                    ],
                  },
                  {
                    id: 'A04AA',
                    name: 'A04AA - Serotonin (5HT3)-antagonister',
                    isChecked: false,
                    children: [
                      {
                        id: 'A04AA01',
                        name: 'A04AA01 - ondansetron',
                        isChecked: false,
                      },
                      {
                        id: 'A04AA02',
                        name: 'A04AA02 - granisetron',
                        isChecked: false,
                      },
                      {
                        id: 'A04AA03',
                        name: 'A04AA03 - tropisetron',
                        isChecked: false,
                      },
                      {
                        id: 'A04AA05',
                        name: 'A04AA05 - palonosetron',
                        isChecked: false,
                      },
                      {
                        id: 'A04AA55',
                        name: 'A04AA55 - palonosetron, kombinasjoner',
                        isChecked: false,
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            id: 'A05',
            name: 'A05 - GALLE- OG LEVERTERAPI',
            isChecked: false,
            children: [
              {
                id: 'A05A',
                name: 'A05A - GALLETERAPI',
                isChecked: false,
                children: [
                  {
                    id: 'A05AA',
                    name: 'A05AA - Gallesyrer og derivater',
                    isChecked: false,
                    children: [
                      {
                        id: 'A05AA01',
                        name: 'A05AA01 - kenodeoksykolsyre',
                        isChecked: false,
                      },
                      {
                        id: 'A05AA02',
                        name: 'A05AA02 - ursodeoksykolsyre',
                        isChecked: false,
                      },
                      {
                        id: 'A05AA04',
                        name: 'A05AA04 - obetikolsyre',
                        isChecked: false,
                      },
                      {
                        id: 'A05AA05',
                        name: 'A05AA05 - ursodoksikoltaurin',
                        isChecked: false,
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            id: 'A06',
            name: 'A06 - MIDLER MOT FORSTOPPELSE',
            isChecked: false,
            children: [
              {
                id: 'A06A',
                name: 'A06A - MIDLER MOT FORSTOPPELSE',
                isChecked: false,
                children: [
                  {
                    id: 'A06AB',
                    name: 'A06AB - Kontaktlaksantia',
                    isChecked: false,
                    children: [
                      {
                        id: 'A06AB02',
                        name: 'A06AB02 - bisakodyl',
                        isChecked: false,
                      },
                      {
                        id: 'A06AB06',
                        name: 'A06AB06 - sennaglykosider',
                        isChecked: false,
                      },
                      {
                        id: 'A06AB08',
                        name: 'A06AB08 - natriumpikosulfat',
                        isChecked: false,
                      },
                      {
                        id: 'A06AB20',
                        name: 'A06AB20 - kombinasjoner av kontaktlaksantia',
                        isChecked: false,
                      },
                      {
                        id: 'A06AB53',
                        name: 'A06AB53 - dantron, kombinasjoner',
                        isChecked: false,
                      },
                      {
                        id: 'A06AB56',
                        name: 'A06AB56 - sennaglykosider, kombinasjoner',
                        isChecked: false,
                      },
                      {
                        id: 'A06AB58',
                        name: 'A06AB58 - natriumpikosulfat, kombinasjoner',
                        isChecked: false,
                      },
                    ],
                  },
                  {
                    id: 'A06AC',
                    name: 'A06AC - Volumøkende laksantia',
                    isChecked: false,
                    children: [
                      {
                        id: 'A06AC01',
                        name: 'A06AC01 - ispaghula (loppefrø)',
                        isChecked: false,
                      },
                      {
                        id: 'A06AC51',
                        name: 'A06AC51 - ispaghula, kombinasjoner',
                        isChecked: false,
                      },
                    ],
                  },
                  {
                    id: 'A06AD',
                    name: 'A06AD - Osmotisk virkende midler',
                    isChecked: false,
                    children: [
                      {
                        id: 'A06AD11',
                        name: 'A06AD11 - laktulose',
                        isChecked: false,
                      },
                      {
                        id: 'A06AD12',
                        name: 'A06AD12 - laktitol',
                        isChecked: false,
                      },
                      {
                        id: 'A06AD15',
                        name: 'A06AD15 - makrogol',
                        isChecked: false,
                      },
                      {
                        id: 'A06AD17',
                        name: 'A06AD17 - natriumfosfat',
                        isChecked: false,
                      },
                      {
                        id: 'A06AD65',
                        name: 'A06AD65 - makrogol, kombinasjoner',
                        isChecked: false,
                      },
                    ],
                  },
                  {
                    id: 'A06AG',
                    name: 'A06AG - Klystermidler',
                    isChecked: false,
                    children: [
                      {
                        id: 'A06AG02',
                        name: 'A06AG02 - bisakodyl',
                        isChecked: false,
                      },
                      {
                        id: 'A06AG04',
                        name: 'A06AG04 - glyserol',
                        isChecked: false,
                      },
                      {
                        id: 'A06AG06',
                        name: 'A06AG06 - olje',
                        isChecked: false,
                      },
                      {
                        id: 'A06AG10',
                        name: 'A06AG10 - dokusatnatrium, inkl. kombinasjoner',
                        isChecked: false,
                      },
                      {
                        id: 'A06AG11',
                        name: 'A06AG11 - natriumlaurylsulfoacetat, inkl. kombinasjoner',
                        isChecked: false,
                      },
                    ],
                  },
                  {
                    id: 'A06AH',
                    name: 'A06AH - Perifere opioidreseptor antagonister',
                    isChecked: false,
                    children: [
                      {
                        id: 'A06AH01',
                        name: 'A06AH01 - metylnaltreksonbromid',
                        isChecked: false,
                      },
                      {
                        id: 'A06AH03',
                        name: 'A06AH03 - naloksegol',
                        isChecked: false,
                      },
                    ],
                  },
                  {
                    id: 'A06AX',
                    name: 'A06AX - Andre midler mot forstoppelse',
                    isChecked: false,
                    children: [
                      {
                        id: 'A06AX01',
                        name: 'A06AX01 - glyserol',
                        isChecked: false,
                      },
                      {
                        id: 'A06AX04',
                        name: 'A06AX04 - linaklotid',
                        isChecked: false,
                      },
                      {
                        id: 'A06AX05',
                        name: 'A06AX05 - prukaloprid',
                        isChecked: false,
                      },
                      {
                        id: 'A06AX06',
                        name: 'A06AX06 - tegaserod',
                        isChecked: false,
                      },
                    ],
                  },
                  {
                    id: 'A06AA',
                    name: 'A06AA - Bløtgjørende midler',
                    isChecked: false,
                    children: [
                      {
                        id: 'A06AA01',
                        name: 'A06AA01 - flytende parafin',
                        isChecked: false,
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            id: 'A07',
            name: 'A07 - ANTIDIARROIKA, TARMANTISEPTIKA OG ANTIINFLAMMATORISKE MIDLER',
            isChecked: false,
            children: [
              {
                id: 'A07A',
                name: 'A07A - TARMANTISEPTIKA',
                isChecked: false,
                children: [
                  {
                    id: 'A07AA',
                    name: 'A07AA - Antibiotika',
                    isChecked: false,
                    children: [
                      {
                        id: 'A07AA01',
                        name: 'A07AA01 - neomycin',
                        isChecked: false,
                      },
                      {
                        id: 'A07AA02',
                        name: 'A07AA02 - nystatin',
                        isChecked: false,
                      },
                      {
                        id: 'A07AA06',
                        name: 'A07AA06 - paromomycin',
                        isChecked: false,
                      },
                      {
                        id: 'A07AA09',
                        name: 'A07AA09 - vankomycin',
                        isChecked: false,
                      },
                      {
                        id: 'A07AA11',
                        name: 'A07AA11 - rifaksimin',
                        isChecked: false,
                      },
                      {
                        id: 'A07AA12',
                        name: 'A07AA12 - fidaksomicin',
                        isChecked: false,
                      },
                    ],
                  },
                ],
              },
              {
                id: 'A07B',
                name: 'A07B - TARMADSORPSJONSMIDLER',
                isChecked: false,
                children: [
                  {
                    id: 'A07BA',
                    name: 'A07BA - Kullmidler',
                    isChecked: false,
                    children: [
                      {
                        id: 'A07BA01',
                        name: 'A07BA01 - medisinsk kull',
                        isChecked: false,
                      },
                    ],
                  },
                  {
                    id: 'A07BB',
                    name: 'A07BB - Vismutmidler',
                    isChecked: false,
                  },
                ],
              },
              {
                id: 'A07C',
                name: 'A07C - ELEKTROLYTTER MED KARBOHYDRATER',
                isChecked: false,
                children: [
                  {
                    id: 'A07CA',
                    name: 'A07CA - Elektrolytter med karbohydrater',
                    isChecked: false,
                  },
                ],
              },
              {
                id: 'A07D',
                name: 'A07D - PERISTALTIKKHEMMENDE MIDLER',
                isChecked: false,
                children: [
                  {
                    id: 'A07DA',
                    name: 'A07DA - Peristaltikkhemmende midler',
                    isChecked: false,
                    children: [
                      {
                        id: 'A07DA01',
                        name: 'A07DA01 - difenoksylat',
                        isChecked: false,
                      },
                      {
                        id: 'A07DA02',
                        name: 'A07DA02 - opium',
                        isChecked: false,
                      },
                      {
                        id: 'A07DA03',
                        name: 'A07DA03 - loperamid',
                        isChecked: false,
                      },
                      {
                        id: 'A07DA06',
                        name: 'A07DA06 - eluksadolin',
                        isChecked: false,
                      },
                      {
                        id: 'A07DA53',
                        name: 'A07DA53 - loperamid, kombinasjoner',
                        isChecked: false,
                      },
                    ],
                  },
                ],
              },
              {
                id: 'A07E',
                name: 'A07E - ANTIINFLAMMATORISKE MIDLER VED TARMLIDELSER',
                isChecked: false,
                children: [
                  {
                    id: 'A07EA',
                    name: 'A07EA - Kortikosteroider med lokal virkning',
                    isChecked: false,
                    children: [
                      {
                        id: 'A07EA01',
                        name: 'A07EA01 - prednisolon',
                        isChecked: false,
                      },
                      {
                        id: 'A07EA02',
                        name: 'A07EA02 - hydrokortison',
                        isChecked: false,
                      },
                      {
                        id: 'A07EA06',
                        name: 'A07EA06 - budesonid',
                        isChecked: false,
                      },
                    ],
                  },
                  {
                    id: 'A07EB',
                    name: 'A07EB - Antiallergiske midler, ekskl. kortikosteroider',
                    isChecked: false,
                    children: [
                      {
                        id: 'A07EB01',
                        name: 'A07EB01 - natriumkromoglikat',
                        isChecked: false,
                      },
                    ],
                  },
                  {
                    id: 'A07EC',
                    name: 'A07EC - Aminosalisylsyre og lignende midler',
                    isChecked: false,
                    children: [
                      {
                        id: 'A07EC01',
                        name: 'A07EC01 - sulfasalazin',
                        isChecked: false,
                      },
                      {
                        id: 'A07EC02',
                        name: 'A07EC02 - mesalazin',
                        isChecked: false,
                      },
                      {
                        id: 'A07EC03',
                        name: 'A07EC03 - olsalazin',
                        isChecked: false,
                      },
                      {
                        id: 'A07EC04',
                        name: 'A07EC04 - balsalazid',
                        isChecked: false,
                      },
                    ],
                  },
                ],
              },
              {
                id: 'A07F',
                name: 'A07F - ANTIDIARROISKE MIKROORGANISMER',
                isChecked: false,
                children: [
                  {
                    id: 'A07FA',
                    name: 'A07FA - Antidiarroiske mikroorganismer',
                    isChecked: false,
                    children: [
                      {
                        id: 'A07FA01',
                        name: 'A07FA01 - melkesyreproduserende organismer',
                        isChecked: false,
                      },
                      {
                        id: 'A07FA02',
                        name: 'A07FA02 - saccharomyces boulardii',
                        isChecked: false,
                      },
                      {
                        id: 'A07FA03',
                        name: 'A07FA03 - escherichia coli',
                        isChecked: false,
                      },
                      {
                        id: 'A07FA51',
                        name: 'A07FA51 - melkesyreproduserende organismer, kombinasjoner',
                        isChecked: false,
                      },
                    ],
                  },
                ],
              },
              {
                id: 'A07X',
                name: 'A07X - ANDRE ANTIDIARROIKA',
                isChecked: false,
                children: [
                  {
                    id: 'A07XA',
                    name: 'A07XA - Andre antidiarroika',
                    isChecked: false,
                    children: [
                      {
                        id: 'A07XA04',
                        name: 'A07XA04 - racekadotril',
                        isChecked: false,
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            id: 'A08',
            name: 'A08 - MIDLER MOT FEDME, EKSKL. DIETTMIDLER',
            isChecked: false,
            children: [
              {
                id: 'A08A',
                name: 'A08A - MIDLER MOT FEDME, EKSKL. DIETTMIDLER',
                isChecked: false,
                children: [
                  {
                    id: 'A08AB',
                    name: 'A08AB - Perifert virkende midler mot fedme',
                    isChecked: false,
                    children: [
                      {
                        id: 'A08AB01',
                        name: 'A08AB01 - orlistat',
                        isChecked: false,
                      },
                    ],
                  },
                  {
                    id: 'A08AX',
                    name: 'A08AX - Andre midler mot fedme',
                    isChecked: false,
                    children: [
                      {
                        id: 'A08AX01',
                        name: 'A08AX01 - rimonabant',
                        isChecked: false,
                      },
                    ],
                  },
                  {
                    id: 'A08AA',
                    name: 'A08AA - Sentralt virkende midler mot fedme',
                    isChecked: false,
                    children: [
                      {
                        id: 'A08AA10',
                        name: 'A08AA10 - sibutramin',
                        isChecked: false,
                      },
                      {
                        id: 'A08AA62',
                        name: 'A08AA62 - bupropion og naltrekson',
                        isChecked: false,
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            id: 'A09',
            name: 'A09 - DIGESTIVA, INKL.ENZYMER',
            isChecked: false,
            children: [
              {
                id: 'A09A',
                name: 'A09A - DIGESTIVA, INKL.ENZYMER',
                isChecked: false,
                children: [
                  {
                    id: 'A09AB',
                    name: 'A09AB - Syremidler',
                    isChecked: false,
                    children: [
                      {
                        id: 'A09AB01',
                        name: 'A09AB01 - glutaminsyrehydroklorid',
                        isChecked: false,
                      },
                      {
                        id: 'A09AB02',
                        name: 'A09AB02 - betainhydroklorid',
                        isChecked: false,
                      },
                      {
                        id: 'A09AB03',
                        name: 'A09AB03 - saltsyre',
                        isChecked: false,
                      },
                      {
                        id: 'A09AB04',
                        name: 'A09AB04 - sitronsyre',
                        isChecked: false,
                      },
                    ],
                  },
                  {
                    id: 'A09AC',
                    name: 'A09AC - Enzymmidler i kombinasjon med syremidler',
                    isChecked: false,
                    children: [
                      {
                        id: 'A09AC01',
                        name: 'A09AC01 - pepsin og syremidler',
                        isChecked: false,
                      },
                      {
                        id: 'A09AC02',
                        name: 'A09AC02 - multienzymer og syremidler',
                        isChecked: false,
                      },
                    ],
                  },
                  {
                    id: 'A09AA',
                    name: 'A09AA - Enzymmidler',
                    isChecked: false,
                    children: [
                      {
                        id: 'A09AA02',
                        name: 'A09AA02 - multienzymer (lipase, protease etc.)',
                        isChecked: false,
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            id: 'A10',
            name: 'A10 - MIDLER TIL DIABETESBEHANDLING',
            isChecked: false,
            children: [
              {
                id: 'A10A',
                name: 'A10A - INSULINER OG ANALOGER',
                isChecked: false,
                children: [
                  {
                    id: 'A10AB',
                    name: 'A10AB - Insuliner og analoger til injeksjon, hurtigvirkende',
                    isChecked: false,
                    children: [
                      {
                        id: 'A10AB01',
                        name: 'A10AB01 - insulin (human)',
                        isChecked: false,
                      },
                      {
                        id: 'A10AB03',
                        name: 'A10AB03 - insulin (svin)',
                        isChecked: false,
                      },
                      {
                        id: 'A10AB04',
                        name: 'A10AB04 - insulin lispro',
                        isChecked: false,
                      },
                      {
                        id: 'A10AB05',
                        name: 'A10AB05 - insulin aspart',
                        isChecked: false,
                      },
                      {
                        id: 'A10AB06',
                        name: 'A10AB06 - insulin glulisin',
                        isChecked: false,
                      },
                    ],
                  },
                  {
                    id: 'A10AC',
                    name: 'A10AC - Insuliner og analoger til injeksjon, middels lang virketid',
                    isChecked: false,
                    children: [
                      {
                        id: 'A10AC01',
                        name: 'A10AC01 - insulin (human)',
                        isChecked: false,
                      },
                      {
                        id: 'A10AC03',
                        name: 'A10AC03 - insulin (svin)',
                        isChecked: false,
                      },
                    ],
                  },
                  {
                    id: 'A10AD',
                    name: 'A10AD - Insuliner og analoger til injeksjon, middels eller lang virketid i kombinasjon med hurtigvirkende',
                    isChecked: false,
                    children: [
                      {
                        id: 'A10AD01',
                        name: 'A10AD01 - insulin (human)',
                        isChecked: false,
                      },
                      {
                        id: 'A10AD03',
                        name: 'A10AD03 - insulin (svin)',
                        isChecked: false,
                      },
                      {
                        id: 'A10AD04',
                        name: 'A10AD04 - insulin lispro',
                        isChecked: false,
                      },
                      {
                        id: 'A10AD05',
                        name: 'A10AD05 - insulin aspart',
                        isChecked: false,
                      },
                    ],
                  },
                  {
                    id: 'A10AE',
                    name: 'A10AE - Insuliner og analoger til injeksjon, langtidsvirkende',
                    isChecked: false,
                    children: [
                      {
                        id: 'A10AE01',
                        name: 'A10AE01 - insulin (human)',
                        isChecked: false,
                      },
                      {
                        id: 'A10AE02',
                        name: 'A10AE02 - insulin (storfe)',
                        isChecked: false,
                      },
                      {
                        id: 'A10AE04',
                        name: 'A10AE04 - insulin glargin',
                        isChecked: false,
                      },
                      {
                        id: 'A10AE05',
                        name: 'A10AE05 - insulin detemir',
                        isChecked: false,
                      },
                      {
                        id: 'A10AE06',
                        name: 'A10AE06 - insulin degludec',
                        isChecked: false,
                      },
                      {
                        id: 'A10AE54',
                        name: 'A10AE54 - insulin glargin og liksisenatid',
                        isChecked: false,
                      },
                      {
                        id: 'A10AE56',
                        name: 'A10AE56 - insulin degludec og liraglutid',
                        isChecked: false,
                      },
                    ],
                  },
                  {
                    id: 'A10AF',
                    name: 'A10AF - Insuliner og analoger til inhalasjon',
                    isChecked: false,
                    children: [
                      {
                        id: 'A10AF01',
                        name: 'A10AF01 - insulin (human)',
                        isChecked: false,
                      },
                    ],
                  },
                ],
              },
              {
                id: 'A10B',
                name: 'A10B - BLODGLUKOSESENKENDE MIDLER, EKSKL. INSULINER',
                isChecked: false,
                children: [
                  {
                    id: 'A10BA',
                    name: 'A10BA - Biguanidderivater',
                    isChecked: false,
                    children: [
                      {
                        id: 'A10BA02',
                        name: 'A10BA02 - metformin',
                        isChecked: false,
                      },
                    ],
                  },
                  {
                    id: 'A10BB',
                    name: 'A10BB - Sulfonyl urea',
                    isChecked: false,
                    children: [
                      {
                        id: 'A10BB01',
                        name: 'A10BB01 - glibenklamid',
                        isChecked: false,
                      },
                      {
                        id: 'A10BB02',
                        name: 'A10BB02 - klorpropamid',
                        isChecked: false,
                      },
                      {
                        id: 'A10BB07',
                        name: 'A10BB07 - glipizid',
                        isChecked: false,
                      },
                      {
                        id: 'A10BB12',
                        name: 'A10BB12 - glimepirid',
                        isChecked: false,
                      },
                    ],
                  },
                  {
                    id: 'A10BD',
                    name: 'A10BD - Kombinasjoner av blodglukosesenkende midler til oralt bruk',
                    isChecked: false,
                    children: [
                      {
                        id: 'A10BD03',
                        name: 'A10BD03 - metformin og rosiglitazon',
                        isChecked: false,
                      },
                      {
                        id: 'A10BD04',
                        name: 'A10BD04 - glimepirid og rosiglitazon',
                        isChecked: false,
                      },
                      {
                        id: 'A10BD05',
                        name: 'A10BD05 - metformin og pioglitazon',
                        isChecked: false,
                      },
                      {
                        id: 'A10BD07',
                        name: 'A10BD07 - metformin og sitagliptin',
                        isChecked: false,
                      },
                      {
                        id: 'A10BD08',
                        name: 'A10BD08 - metformin og vildagliptin',
                        isChecked: false,
                      },
                      {
                        id: 'A10BD10',
                        name: 'A10BD10 - metformin og saksagliptin',
                        isChecked: false,
                      },
                      {
                        id: 'A10BD11',
                        name: 'A10BD11 - metformin og linagliptin',
                        isChecked: false,
                      },
                      {
                        id: 'A10BD15',
                        name: 'A10BD15 - metformin og dapagliflozin',
                        isChecked: false,
                      },
                      {
                        id: 'A10BD19',
                        name: 'A10BD19 - linagliptin og empagliflozin',
                        isChecked: false,
                      },
                      {
                        id: 'A10BD20',
                        name: 'A10BD20 - metformin og empagliflozin',
                        isChecked: false,
                      },
                      {
                        id: 'A10BD21',
                        name: 'A10BD21 - saksagliptin og dapagliflozin',
                        isChecked: false,
                      },
                      {
                        id: 'A10BD23',
                        name: 'A10BD23 - metformin og ertugliflozin',
                        isChecked: false,
                      },
                      {
                        id: 'A10BD24',
                        name: 'A10BD24 - sitagliptin og ertugliflozin',
                        isChecked: false,
                      },
                    ],
                  },
                  {
                    id: 'A10BF',
                    name: 'A10BF - Alfa glukosidasehemmere',
                    isChecked: false,
                    children: [
                      {
                        id: 'A10BF01',
                        name: 'A10BF01 - akarbose',
                        isChecked: false,
                      },
                    ],
                  },
                  {
                    id: 'A10BG',
                    name: 'A10BG - Tiazolidindioner',
                    isChecked: false,
                    children: [
                      {
                        id: 'A10BG02',
                        name: 'A10BG02 - rosiglitazon',
                        isChecked: false,
                      },
                      {
                        id: 'A10BG03',
                        name: 'A10BG03 - pioglitazon',
                        isChecked: false,
                      },
                    ],
                  },
                  {
                    id: 'A10BH',
                    name: 'A10BH - Dipepitidylpeptidase 4-hemmere',
                    isChecked: false,
                    children: [
                      {
                        id: 'A10BH01',
                        name: 'A10BH01 - sitagliptin',
                        isChecked: false,
                      },
                      {
                        id: 'A10BH02',
                        name: 'A10BH02 - vildagliptin',
                        isChecked: false,
                      },
                      {
                        id: 'A10BH03',
                        name: 'A10BH03 - saksagliptin',
                        isChecked: false,
                      },
                      {
                        id: 'A10BH05',
                        name: 'A10BH05 - linagliptin',
                        isChecked: false,
                      },
                    ],
                  },
                  {
                    id: 'A10BJ',
                    name: 'A10BJ - Glukagonlignende peptid-1 (GLP-1)-analoger',
                    isChecked: false,
                    children: [
                      {
                        id: 'A10BJ01',
                        name: 'A10BJ01 - eksenatid',
                        isChecked: false,
                      },
                      {
                        id: 'A10BJ02',
                        name: 'A10BJ02 - liraglutid',
                        isChecked: false,
                      },
                      {
                        id: 'A10BJ03',
                        name: 'A10BJ03 - liksisenatid',
                        isChecked: false,
                      },
                      {
                        id: 'A10BJ05',
                        name: 'A10BJ05 - dulaglutid',
                        isChecked: false,
                      },
                      {
                        id: 'A10BJ06',
                        name: 'A10BJ06 - semaglutid',
                        isChecked: false,
                      },
                    ],
                  },
                  {
                    id: 'A10BK',
                    name: 'A10BK - Natriumglukose-kotransportør 2 (SLGT2)-hemmere',
                    isChecked: false,
                    children: [
                      {
                        id: 'A10BK01',
                        name: 'A10BK01 - dapagliflozin',
                        isChecked: false,
                      },
                      {
                        id: 'A10BK02',
                        name: 'A10BK02 - kanagliflozin',
                        isChecked: false,
                      },
                      {
                        id: 'A10BK03',
                        name: 'A10BK03 - empagliflozin',
                        isChecked: false,
                      },
                      {
                        id: 'A10BK04',
                        name: 'A10BK04 - ertugliflozin',
                        isChecked: false,
                      },
                    ],
                  },
                  {
                    id: 'A10BX',
                    name: 'A10BX - Andre blodglukosesenkende midler, ekskl. insuliner',
                    isChecked: false,
                    children: [
                      {
                        id: 'A10BX02',
                        name: 'A10BX02 - repaglinid',
                        isChecked: false,
                      },
                      {
                        id: 'A10BX03',
                        name: 'A10BX03 - nateglinid',
                        isChecked: false,
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            id: 'A11',
            name: 'A11 - VITAMINER',
            isChecked: false,
            children: [
              {
                id: 'A11A',
                name: 'A11A - MULTIVITAMINER, KOMBINASJONER',
                isChecked: false,
                children: [
                  {
                    id: 'A11AA',
                    name: 'A11AA - Multivitaminer med mineraler',
                    isChecked: false,
                    children: [
                      {
                        id: 'A11AA01',
                        name: 'A11AA01 - multivitaminer og jern',
                        isChecked: false,
                      },
                      {
                        id: 'A11AA03',
                        name: 'A11AA03 - multivitaminer og andre mineraler inkl. kombinasjoner',
                        isChecked: false,
                      },
                    ],
                  },
                ],
              },
              {
                id: 'A11B',
                name: 'A11B - MULTIVITAMINER, USAMMENSATTE',
                isChecked: false,
                children: [
                  {
                    id: 'A11BA',
                    name: 'A11BA - Multivitaminer, usammensatte',
                    isChecked: false,
                  },
                ],
              },
              {
                id: 'A11C',
                name: 'A11C - VITAMIN A OG D, INKL. A OG D I KOMBINASJON',
                isChecked: false,
                children: [
                  {
                    id: 'A11CA',
                    name: 'A11CA - Vitamin A, usammensatte',
                    isChecked: false,
                    children: [
                      {
                        id: 'A11CA01',
                        name: 'A11CA01 - retinol (vit a)',
                        isChecked: false,
                      },
                      {
                        id: 'A11CA02',
                        name: 'A11CA02 - betakaroten',
                        isChecked: false,
                      },
                    ],
                  },
                  {
                    id: 'A11CC',
                    name: 'A11CC - Vitamin D og analoger',
                    isChecked: false,
                    children: [
                      {
                        id: 'A11CC01',
                        name: 'A11CC01 - ergokalsiferol',
                        isChecked: false,
                      },
                      {
                        id: 'A11CC02',
                        name: 'A11CC02 - dihydrotakysterol',
                        isChecked: false,
                      },
                      {
                        id: 'A11CC03',
                        name: 'A11CC03 - alfakalsidol',
                        isChecked: false,
                      },
                      {
                        id: 'A11CC04',
                        name: 'A11CC04 - kalsitriol',
                        isChecked: false,
                      },
                      {
                        id: 'A11CC05',
                        name: 'A11CC05 - kolekalsiferol',
                        isChecked: false,
                      },
                    ],
                  },
                ],
              },
              {
                id: 'A11D',
                name: 'A11D - VITAMIN B1, INKL. KOMBINASJONER MED B6 OG B12',
                isChecked: false,
                children: [
                  {
                    id: 'A11DA',
                    name: 'A11DA - Vitamin B1, usammensatte',
                    isChecked: false,
                    children: [
                      {
                        id: 'A11DA01',
                        name: 'A11DA01 - tiamin (vit b1)',
                        isChecked: false,
                      },
                    ],
                  },
                  {
                    id: 'A11DB',
                    name: 'A11DB - Vitamin B1 i kombinasjoner med vitamin B6 og/eller vitamin B12',
                    isChecked: false,
                  },
                ],
              },
              {
                id: 'A11E',
                name: 'A11E - VITAMIN B-KOMPLEKS, INKL. KOMBINASJONER',
                isChecked: false,
                children: [
                  {
                    id: 'A11EA',
                    name: 'A11EA - Vitamin B-kompleks, usammensatte',
                    isChecked: false,
                  },
                  {
                    id: 'A11EB',
                    name: 'A11EB - Vitamin B-kompleks med vitamin C',
                    isChecked: false,
                  },
                  {
                    id: 'A11EX',
                    name: 'A11EX - Vitamin B-kompleks, andre kombinasjoner',
                    isChecked: false,
                  },
                ],
              },
              {
                id: 'A11G',
                name: 'A11G - VITAMIN C, INKL. KOMBINASJONER',
                isChecked: false,
                children: [
                  {
                    id: 'A11GA',
                    name: 'A11GA - Askorbinsyre (vitamin C), usammensatte',
                    isChecked: false,
                    children: [
                      {
                        id: 'A11GA01',
                        name: 'A11GA01 - askorbinsyre (vit c)',
                        isChecked: false,
                      },
                    ],
                  },
                ],
              },
              {
                id: 'A11H',
                name: 'A11H - ANDRE USAMMENSATTE VITAMINMIDLER',
                isChecked: false,
                children: [
                  {
                    id: 'A11HA',
                    name: 'A11HA - Andre usammensatte vitaminmidler',
                    isChecked: false,
                    children: [
                      {
                        id: 'A11HA01',
                        name: 'A11HA01 - nikotinamid',
                        isChecked: false,
                      },
                      {
                        id: 'A11HA02',
                        name: 'A11HA02 - pyridoksin (vit b6)',
                        isChecked: false,
                      },
                      {
                        id: 'A11HA03',
                        name: 'A11HA03 - tokoferol (vit e)',
                        isChecked: false,
                      },
                      {
                        id: 'A11HA04',
                        name: 'A11HA04 - riboflavin (vit b2)',
                        isChecked: false,
                      },
                      {
                        id: 'A11HA05',
                        name: 'A11HA05 - biotin',
                        isChecked: false,
                      },
                      {
                        id: 'A11HA06',
                        name: 'A11HA06 - pyridoksalfosfat',
                        isChecked: false,
                      },
                      {
                        id: 'A11HA08',
                        name: 'A11HA08 - tokofersolan',
                        isChecked: false,
                      },
                    ],
                  },
                ],
              },
              {
                id: 'A11J',
                name: 'A11J - ANDRE VITAMINMIDLER, KOMBINASJONER',
                isChecked: false,
                children: [
                  {
                    id: 'A11JA',
                    name: 'A11JA - Kombinasjoner av vitaminer',
                    isChecked: false,
                  },
                  {
                    id: 'A11JB',
                    name: 'A11JB - Vitaminer med mineraler',
                    isChecked: false,
                  },
                  {
                    id: 'A11JC',
                    name: 'A11JC - Vitaminer, andre kombinasjoner',
                    isChecked: false,
                  },
                ],
              },
            ],
          },
          {
            id: 'A12',
            name: 'A12 - MINERALTILSKUDD',
            isChecked: false,
            children: [
              {
                id: 'A12A',
                name: 'A12A - KALSIUM',
                isChecked: false,
                children: [
                  {
                    id: 'A12AX',
                    name: 'A12AX - Kalsium, kombinasjoner med vitamin D og/eller andre midler',
                    isChecked: false,
                  },
                  {
                    id: 'A12AA',
                    name: 'A12AA - Kalsium',
                    isChecked: false,
                    children: [
                      {
                        id: 'A12AA02',
                        name: 'A12AA02 - kalsiumglubionat',
                        isChecked: false,
                      },
                      {
                        id: 'A12AA04',
                        name: 'A12AA04 - kalsiumkarbonat',
                        isChecked: false,
                      },
                      {
                        id: 'A12AA06',
                        name: 'A12AA06 - kalsiumlaktoglukonat',
                        isChecked: false,
                      },
                      {
                        id: 'A12AA13',
                        name: 'A12AA13 - kalsiumsitrat',
                        isChecked: false,
                      },
                      {
                        id: 'A12AA20',
                        name: 'A12AA20 - kalsium, blanding av salter',
                        isChecked: false,
                      },
                    ],
                  },
                ],
              },
              {
                id: 'A12B',
                name: 'A12B - KALIUM',
                isChecked: false,
                children: [
                  {
                    id: 'A12BA',
                    name: 'A12BA - Kalium',
                    isChecked: false,
                    children: [
                      {
                        id: 'A12BA01',
                        name: 'A12BA01 - kaliumklorid',
                        isChecked: false,
                      },
                      {
                        id: 'A12BA02',
                        name: 'A12BA02 - kaliumsitrat',
                        isChecked: false,
                      },
                      {
                        id: 'A12BA30',
                        name: 'A12BA30 - kalium, ulike salter i kombinasjon',
                        isChecked: false,
                      },
                    ],
                  },
                ],
              },
              {
                id: 'A12C',
                name: 'A12C - ANDRE MINERALMIDLER',
                isChecked: false,
                children: [
                  {
                    id: 'A12CA',
                    name: 'A12CA - Natrium',
                    isChecked: false,
                    children: [
                      {
                        id: 'A12CA01',
                        name: 'A12CA01 - natriumklorid',
                        isChecked: false,
                      },
                    ],
                  },
                  {
                    id: 'A12CB',
                    name: 'A12CB - Sink',
                    isChecked: false,
                    children: [
                      {
                        id: 'A12CB01',
                        name: 'A12CB01 - sinksulfat',
                        isChecked: false,
                      },
                    ],
                  },
                  {
                    id: 'A12CC',
                    name: 'A12CC - Magnesium',
                    isChecked: false,
                    children: [
                      {
                        id: 'A12CC01',
                        name: 'A12CC01 - magnesiumklorid',
                        isChecked: false,
                      },
                      {
                        id: 'A12CC04',
                        name: 'A12CC04 - magnesiumsitrat',
                        isChecked: false,
                      },
                      {
                        id: 'A12CC10',
                        name: 'A12CC10 - magnesiumoksid',
                        isChecked: false,
                      },
                      {
                        id: 'A12CC30',
                        name: 'A12CC30 - magnesium, blanding av salter',
                        isChecked: false,
                      },
                    ],
                  },
                  {
                    id: 'A12CX',
                    name: 'A12CX - Diverse mineralmidler',
                    isChecked: false,
                  },
                ],
              },
            ],
          },
          {
            id: 'A13',
            name: 'A13 - TONIKA',
            isChecked: false,
          },
          {
            id: 'A14',
            name: 'A14 - ANABOLE MIDLER TIL SYSTEMISK BRUK',
            isChecked: false,
            children: [
              {
                id: 'A14A',
                name: 'A14A - ANABOLE STEROIDER',
                isChecked: false,
                children: [
                  {
                    id: 'A14AB',
                    name: 'A14AB - Estrenderivater',
                    isChecked: false,
                    children: [
                      {
                        id: 'A14AB01',
                        name: 'A14AB01 - nandrolon',
                        isChecked: false,
                      },
                    ],
                  },
                  {
                    id: 'A14AA',
                    name: 'A14AA - Androstanderivater',
                    isChecked: false,
                    children: [
                      {
                        id: 'A14AA04',
                        name: 'A14AA04 - metenolon',
                        isChecked: false,
                      },
                      {
                        id: 'A14AA07',
                        name: 'A14AA07 - prasteron',
                        isChecked: false,
                      },
                      {
                        id: 'A14AA08',
                        name: 'A14AA08 - oksandrolon',
                        isChecked: false,
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            id: 'A16',
            name: 'A16 - ANDRE FORDØYELSES- OG STOFFSKIFTEMIDLER',
            isChecked: false,
            children: [
              {
                id: 'A16A',
                name: 'A16A - ANDRE FORDØYELSES- OG STOFFSKIFTEMIDLER',
                isChecked: false,
                children: [
                  {
                    id: 'A16AB',
                    name: 'A16AB - Enzymer',
                    isChecked: false,
                    children: [
                      {
                        id: 'A16AB02',
                        name: 'A16AB02 - imiglukerase',
                        isChecked: false,
                      },
                      {
                        id: 'A16AB03',
                        name: 'A16AB03 - agalsidase alfa',
                        isChecked: false,
                      },
                      {
                        id: 'A16AB04',
                        name: 'A16AB04 - agalsidase beta',
                        isChecked: false,
                      },
                      {
                        id: 'A16AB05',
                        name: 'A16AB05 - laronidase',
                        isChecked: false,
                      },
                      {
                        id: 'A16AB07',
                        name: 'A16AB07 - alglukosidase alfa',
                        isChecked: false,
                      },
                      {
                        id: 'A16AB08',
                        name: 'A16AB08 - galsulfase',
                        isChecked: false,
                      },
                      {
                        id: 'A16AB09',
                        name: 'A16AB09 - idursulfase',
                        isChecked: false,
                      },
                      {
                        id: 'A16AB10',
                        name: 'A16AB10 - velaglukerase alfa',
                        isChecked: false,
                      },
                      {
                        id: 'A16AB12',
                        name: 'A16AB12 - elosulfase alfa',
                        isChecked: false,
                      },
                    ],
                  },
                  {
                    id: 'A16AX',
                    name: 'A16AX - Andre fordøyelses- og stoffskiftemidler',
                    isChecked: false,
                    children: [
                      {
                        id: 'A16AX01',
                        name: 'A16AX01 - tioktinsyre',
                        isChecked: false,
                      },
                      {
                        id: 'A16AX03',
                        name: 'A16AX03 - natriumfenylbutyrat',
                        isChecked: false,
                      },
                      {
                        id: 'A16AX04',
                        name: 'A16AX04 - nitisinon',
                        isChecked: false,
                      },
                      {
                        id: 'A16AX05',
                        name: 'A16AX05 - sinkacetat',
                        isChecked: false,
                      },
                      {
                        id: 'A16AX06',
                        name: 'A16AX06 - miglustat',
                        isChecked: false,
                      },
                      {
                        id: 'A16AX07',
                        name: 'A16AX07 - sapropterin',
                        isChecked: false,
                      },
                      {
                        id: 'A16AX08',
                        name: 'A16AX08 - teduglutid',
                        isChecked: false,
                      },
                      {
                        id: 'A16AX09',
                        name: 'A16AX09 - glyserolfenylbutyrat',
                        isChecked: false,
                      },
                      {
                        id: 'A16AX10',
                        name: 'A16AX10 - eliglustat',
                        isChecked: false,
                      },
                      {
                        id: 'A16AX12',
                        name: 'A16AX12 - trientin',
                        isChecked: false,
                      },
                      {
                        id: 'A16AX14',
                        name: 'A16AX14 - migalastat',
                        isChecked: false,
                      },
                      {
                        id: 'A16AX15',
                        name: 'A16AX15 - telotristat',
                        isChecked: false,
                      },
                    ],
                  },
                  {
                    id: 'A16AA',
                    name: 'A16AA - Aminosyrer og derivater',
                    isChecked: false,
                    children: [
                      {
                        id: 'A16AA01',
                        name: 'A16AA01 - levokarnitin',
                        isChecked: false,
                      },
                      {
                        id: 'A16AA03',
                        name: 'A16AA03 - glutamin',
                        isChecked: false,
                      },
                      {
                        id: 'A16AA04',
                        name: 'A16AA04 - merkaptamin',
                        isChecked: false,
                      },
                      {
                        id: 'A16AA05',
                        name: 'A16AA05 - kargluminsyre',
                        isChecked: false,
                      },
                      {
                        id: 'A16AA06',
                        name: 'A16AA06 - betain',
                        isChecked: false,
                      },
                      {
                        id: 'A16AA07',
                        name: 'A16AA07 - metreleptin',
                        isChecked: false,
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];
