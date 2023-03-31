import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { FhiDiagramTypeGroups, FhiDiagramTypes } from '../fhi-diagram/fhi-diagram-types';
import { FhiDiagramType } from '../fhi-diagram/fhi-diagram.models';

interface NavDiagramTypeGroup {
  diagramType: FhiDiagramType;
  icon: string;
  id: string;
  isDisabled: boolean;
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

  chartSubmenuIsOpen = false;
  navDiagramTypeGroupsOk = false;
  navChartTypes!: FhiDiagramType[];
  navDiagramTypeGroups!: NavDiagramTypeGroup[] | undefined;

  constructor() {
    this.navChartTypes = this.getNavChartTypes();
    this.navDiagramTypeGroups = this.getNavDiagramTypeGroups();
  }

  ngOnChanges() {
    this.setChartSubmenuIsOpen();
    this.updateNavDiagramChartGroup();
  }

  navigate(diagramType: FhiDiagramType) {
    this.navigateToDiagramType.emit(diagramType);
  }

  diagramTypeGroupIsChart(id: string) {
    if (id === FhiDiagramTypeGroups.chart) {
      return true;
    }
    return false;
  }

  private setChartSubmenuIsOpen() {
    if (this.currentDiagramTypeGroup === FhiDiagramTypeGroups.chart) {
      this.chartSubmenuIsOpen = true;
    } else {
      this.chartSubmenuIsOpen = false;
    }
  }

  private updateNavDiagramChartGroup() {
    const id = this.currentDiagramType.id;
    const chartType = this.getNavChartTypes().find(chartType => chartType.id === id);

    if (chartType !== undefined && this.navDiagramTypeGroups[2] !== undefined) {
      this.navDiagramTypeGroups[2] = this.getNavDiagramChartGroup(id);
    }
  }

  private getNavChartTypes(): FhiDiagramType[] {
    return [
      FhiDiagramTypes.line,
      FhiDiagramTypes.column,
      FhiDiagramTypes.bar,
      FhiDiagramTypes.columnStacked,
      FhiDiagramTypes.barStacked
    ];
  }

  private getNavMapTypes(): FhiDiagramType[] {
    return [
      FhiDiagramTypes.mapFylker,
      FhiDiagramTypes.mapFylker2019
    ];
  }

  private getNavDiagramTypeGroups(): NavDiagramTypeGroup[] | undefined {
    const navDiagramTableGroup = {
      diagramType: FhiDiagramTypes.table,
      icon: FhiDiagramTypes.table.icon,
      id: FhiDiagramTypeGroups.table,
      isDisabled: false,
      name: FhiDiagramTypes.table.name
    };
    const navDiagramMapGroup = this.getNavDiagramMapGroup(FhiDiagramTypes.mapFylker.id);
    const navDiagramChartGroup = this.getNavDiagramChartGroup(FhiDiagramTypes.column.id);

    if (navDiagramMapGroup !== undefined
        && navDiagramChartGroup !== undefined) {

      this.navDiagramTypeGroupsOk = true;

      return [
        navDiagramTableGroup,
        navDiagramMapGroup,
        navDiagramChartGroup
      ];
    } else {
      console.error(this.getErrorMsg());
      return undefined;
    }
  }

  private getNavDiagramMapGroup(diagramtypeId: string): NavDiagramTypeGroup {
    let navDiagramTypeGroups: NavDiagramTypeGroup[] = [];

    this.getNavMapTypes().forEach(type => {
      navDiagramTypeGroups.push({
        diagramType: type,
        icon: type.icon,
        id: FhiDiagramTypeGroups.map,
        isDisabled: true,
        name: 'Kart'
      });
    });
    return navDiagramTypeGroups
      .find((group) => group.diagramType.id === diagramtypeId);
  }

  private getNavDiagramChartGroup(diagramtypeId: string): NavDiagramTypeGroup {
    let navDiagramTypeGroups: NavDiagramTypeGroup[] = [];

    this.getNavChartTypes().forEach(type => {
      navDiagramTypeGroups.push({
        diagramType: type,
        icon: type.icon,
        id: FhiDiagramTypeGroups.chart,
        isDisabled: false,
        name: 'Graf'
      });
    });
    return navDiagramTypeGroups
      .find((group) => group.diagramType.id === diagramtypeId);
  }

  private getErrorMsg() {
    return `FhiDiagramTypeNavComponent.getNavDiagramTypeGroups():
navDiagramMapGroup or navDiagramChartGroup is undefined,
the FhiDiagramTypeNav can not be rendered.`;
  }

}
