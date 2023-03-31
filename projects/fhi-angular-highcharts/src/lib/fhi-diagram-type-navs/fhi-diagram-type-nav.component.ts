import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { FhiDiagramTypeGroups, FhiDiagramTypes } from '../fhi-diagram/fhi-diagram-types';
import { FhiDiagramType } from '../fhi-diagram/fhi-diagram.models';

interface DiagramTypeNavItem {
  children?: DiagramTypeNavItem[];
  diagramType: FhiDiagramType;
  icon?: string;
  name: string;
}

@Component({
  selector: 'fhi-diagram-type-nav',
  templateUrl: './fhi-diagram-type-nav.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FhiDiagramTypeNavComponent {

  @Input() currentDiagramTypeGroup!: string;
  @Input() currentDiagramType!: FhiDiagramType;

  @Output() navigateToDiagramType = new EventEmitter<FhiDiagramType>();

  FhiDiagramTypes = FhiDiagramTypes;
  FhiDiagramTypeGroups = FhiDiagramTypeGroups;
  currentChildDiagramtype = FhiDiagramTypes.column
  chartSubmenuIsOpen = false;
  navItems = this.getNavItems();

  ngOnChanges() {
    console.log('ngOnChanges() -> diagramType', this.currentDiagramType);
    console.log('ngOnChanges() -> currentDiagramTypeGroup', this.currentDiagramTypeGroup);

    this.updateTemplate();
  }

  private updateTemplate() {
    // this.parentIsChecked();
  }

  navigate(item: DiagramTypeNavItem) {
    console.log('navigate() -> diagramType', item.diagramType);
    this.navigateToDiagramType.emit(item.diagramType);
  }

  childIsChecked(item: DiagramTypeNavItem) {
  }

  parentIsChecked(item: DiagramTypeNavItem) {
    // if (item.diagramType === this.currentDiagramType
    //     || this.currentDiagramTypeIsChart ) {
    if (item.diagramType === FhiDiagramTypes.table) {
      return true;
    }
    return false;
  }

  diagramTypeGroupIsChart(item: DiagramTypeNavItem) {
    // TODO: test based on FhiDiagramTypeGroups
    if (item.children !== undefined) {
      return true;
    }
    return false;
  }

  openChartSubmenu(event: Event) {
    console.log('item', event);
    // if (item.children !== undefined) {
    //   this.chartSubmenuIsOpen = true;
    // }
    // this.chartSubmenuIsOpen = false;
  }

  // TODO:
  //   - Create logic for disabled (if dataset does not match diagram type).
  //   - Create logic for subset (only include what consumer want).
  private getNavItems(): DiagramTypeNavItem[] {
    const diagramTypeSubset = [
      FhiDiagramTypes.table,
      FhiDiagramTypes.mapFylker,
    ];
    const diagramTypeChildrenSubset = [
      FhiDiagramTypes.line,
      FhiDiagramTypes.column,
      FhiDiagramTypes.bar,
      FhiDiagramTypes.columnStacked,
      FhiDiagramTypes.barStacked
    ];
    let parents: DiagramTypeNavItem[] = this.getNavItemSubset(diagramTypeSubset);
    let children: DiagramTypeNavItem[] = this.getNavItemSubset(diagramTypeChildrenSubset);

    return [
      ...parents, {
      children: children,
      diagramType: FhiDiagramTypes.column,
      icon: FhiDiagramTypes.column.icon,
      name: 'Graf'
    }];
  }

  private getNavItemSubset(diagramTypeSubset: FhiDiagramType[]): DiagramTypeNavItem[] {
    let subset: DiagramTypeNavItem[] = [];
    diagramTypeSubset.forEach(diagramType => {
      subset.push({
        diagramType: diagramType,
        icon: diagramType.icon,
        name: diagramType.name
      });
    });
    return subset;
  }










  // TODO:
  //   - Transfer all values to FhiDiagramTypes.
  //   - Create logic for navigation based on real values
  //   - Create logic for subset (only include what consumer want).
  chartIsActive: boolean;

  navItemsOld = [
    {
      name: 'Tabell',
      icon: 'table'
    },
    {
      name: 'Kart',
      icon: 'geo-alt' },
    {
      name: 'Graf',
      icon: null,
      hasChartTypes: true,
      chartTypes: [
        'Linjediagram',
        'Søylediagram',
        'Liggende søylediagram',
        'Stablet søylediagram',
        'Stablet liggende søylediagram',
        // 'Kakediagram'
      ]
    }
  ];
  chartTypes = [
    { name: 'Linjediagram', icon: 'graph-up' },
    { name: 'Søylediagram', icon: 'bar-chart-line' },
    { name: 'Liggende søylediagram', icon: 'bar-chart-line-horizontal' },
    { name: 'Stablet søylediagram', icon: 'bar-chart-line-stacked' },
    { name: 'Stablet liggende søylediagram', icon: 'bar-chart-line-stacked-horizontal' },
    // { name: 'Kakediagram', icon: 'pie-chart' },
  ];
  currentChartType: string = 'bar-chart-line';

  changeChartType(icon: string) {
    if (icon !== 'table') {
      this.currentChartType = icon;
    }

    // TMP hack to make navigation work
    let diagramType: FhiDiagramType;
    switch (icon) {
      case FhiDiagramTypes.table.icon:
        diagramType = FhiDiagramTypes.table;
        break;

      case FhiDiagramTypes.mapFylker.icon:
        diagramType = FhiDiagramTypes.mapFylker;
        break;

      case FhiDiagramTypes.line.icon:
        diagramType = FhiDiagramTypes.line;
        break;

      case FhiDiagramTypes.column.icon:
        diagramType = FhiDiagramTypes.column;
        break;

      case FhiDiagramTypes.bar.icon:
        diagramType = FhiDiagramTypes.bar;
        break;

      case FhiDiagramTypes.columnStacked.icon:
        diagramType = FhiDiagramTypes.columnStacked;
        break;

      case FhiDiagramTypes.barStacked.icon:
        diagramType = FhiDiagramTypes.barStacked;
        break;

      default:
        diagramType = FhiDiagramTypes.table;
    }
    // this.navigate(diagramType);
  }




}
