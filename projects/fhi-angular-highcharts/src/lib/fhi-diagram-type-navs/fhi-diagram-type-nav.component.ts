import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { FhiDiagramTypeGroups, FhiDiagramTypes } from '../fhi-diagram/fhi-diagram-types';
import { FhiDiagramType } from '../fhi-diagram/fhi-diagram.models';

interface NavDiagramTypeGroup {
  diagramType: FhiDiagramType;
  icon: string;
  id: string;
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
  chartSubmenuIsOpen = false;
  currentChartIcon = FhiDiagramTypes.column.icon;
  navChartTypes = this.getChartItems();
  navDiagramTypeGroups = this.getNavDiagramTypeGroups();

  ngOnChanges() {
    console.log('ngOnChanges() -> diagramType', this.currentDiagramType);
    console.log('ngOnChanges() -> currentDiagramTypeGroup', this.currentDiagramTypeGroup);

    // this.updateTemplate();
  }

  // private updateTemplate() {
  //   // this.parentIsChecked();
  // }

  navigate(diagramType: FhiDiagramType) {
    console.log('navigate() -> diagramType', diagramType);
    this.navigateToDiagramType.emit(diagramType);
  }

  // childIsChecked(item: DiagramTypeNavItem) {
  // }

  parentIsChecked(id: string) {
    if (id === FhiDiagramTypeGroups.table) {
      return true;
    }
    return false;
  }

  diagramTypeGroupIsChart(id: string) {
    if (id === FhiDiagramTypeGroups.chart) {
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
  private getChartItems(): FhiDiagramType[] {
    return [
      FhiDiagramTypes.line,
      FhiDiagramTypes.column,
      FhiDiagramTypes.bar,
      FhiDiagramTypes.columnStacked,
      FhiDiagramTypes.barStacked
    ];
  }

  private getNavDiagramTypeGroups(): NavDiagramTypeGroup[] {
    return [{
      diagramType: FhiDiagramTypes.table,
      icon: FhiDiagramTypes.table.icon,
      id: FhiDiagramTypeGroups.table,
      name: FhiDiagramTypes.table.name
    }, {
      diagramType: FhiDiagramTypes.mapFylker,
      icon: FhiDiagramTypes.mapFylker.icon,
      id: FhiDiagramTypeGroups.map,
      name: 'Kart'
    }, {
      diagramType: FhiDiagramTypes.column,
      icon: FhiDiagramTypes.column.icon,
      id: FhiDiagramTypeGroups.chart,
      name: 'Graf'
    }];
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
